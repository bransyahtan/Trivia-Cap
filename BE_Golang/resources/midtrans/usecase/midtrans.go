package usecase

import (
	"context"
	"fmt"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/midtrans/midtrans-go/snap"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"github.com/rdwansch/Trivia-Cap/internal/config"
	"strconv"
)

type midtransUseCase struct {
	client         snap.Client
	midtransConfig config.Midtrans
}

func NewMidtransUseCase(cnf *config.Config) domain.MidtransService {
	var client snap.Client
	environment := midtrans.Sandbox
	if cnf.Midtrans.IsProd {
		environment = midtrans.Production
	}
	
	client.New(cnf.Midtrans.Key, environment)
	
	return &midtransUseCase{
		client:         client,
		midtransConfig: cnf.Midtrans,
	}
}

func (m midtransUseCase) GenerateSnapURLCoreAPI(ctx context.Context, t *domain.TopUp, detailCustomer dto.TopupReq) error {
	apiKeyMidtrans := config.Get().Midtrans.Key
	var client coreapi.Client
	
	client.New(apiKeyMidtrans, midtrans.Sandbox)
	
	req := &coreapi.ChargeReq{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(int(t.Id)),
			GrossAmt: int64(t.Amount),
		},
	}
	
	chargeresp, _ := client.ChargeTransaction(req)
	
	fmt.Println("trnsaction id : ", chargeresp.TransactionID)
	return nil
}

func (m midtransUseCase) GenerateSnapURL(ctx context.Context, t *domain.TopUp, detailCustomer dto.TopupReq) error {
	// 2. Initiate Snap request
	grossPrice := t.Amount * 1
	productName := fmt.Sprintf("%d Diamonds", t.AmountDiamond)
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  t.OrderId,
			GrossAmt: int64(grossPrice),
		},
		Items: &[]midtrans.ItemDetails{
			{
				ID:    "78",
				Price: int64(t.Amount),
				Qty:   1,
				Name:  productName,
			},
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: "",
			LName: detailCustomer.Name,
			Email: detailCustomer.Email,
			Phone: "0877777777",
		},
	}
	//req := &coreapi.CaptureReq{
	//	TransactionID: "",
	//	GrossAmt:      0,
	//}
	
	// 3. Request create Snap transaction to Midtrans
	
	snapResp, err := m.client.CreateTransaction(req)
	if err != nil {
		return err
	}
	t.SnapURL = snapResp.RedirectURL
	t.Token = snapResp.Token
	return nil
}

func (m midtransUseCase) VerifyPayment(orderId string) (string, error) {
	var client coreapi.Client
	
	envi := midtrans.Sandbox
	if m.midtransConfig.IsProd {
		envi = midtrans.Production
	}
	client.New(m.midtransConfig.Key, envi)
	// 3. Get order-id from payload
	
	// 4. Check transaction to Midtrans with param orderId
	transactionStatusResp, err := client.CheckTransaction(orderId)
	if err != nil {
		return "", err
	} else {
		if transactionStatusResp != nil {
			// 5. Do set transaction status based on response from check transaction status
			if transactionStatusResp.TransactionStatus == "capture" {
				if transactionStatusResp.FraudStatus == "challenge" {
					// TODO set transaction status on your database to 'challenge'
					// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
				} else if transactionStatusResp.FraudStatus == "accept" {
					return "sukses 1", nil
				}
			} else if transactionStatusResp.TransactionStatus == "settlement" {
				return "settlement", nil
			} else if transactionStatusResp.TransactionStatus == "deny" {
				return "deny", nil
			} else if transactionStatusResp.TransactionStatus == "cancel" || transactionStatusResp.TransactionStatus == "expire" {
				return "cancel", nil
			} else if transactionStatusResp.TransactionStatus == "pending" {
				return "menunggu pembayaran", nil
			}
		}
	}
	return "", nil
}
