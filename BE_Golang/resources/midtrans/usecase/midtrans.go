package usecase

import (
	"context"
	"errors"
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

func (m midtransUseCase) GenerateSnapURL(ctx context.Context, t *domain.TopUp, detailCustomer dto.TopupReq) error {
	// 2. Initiate Snap request
	grossPrice := t.Amount * 1
	productName := fmt.Sprintf("%d Diamonds", t.AmountDiamond)
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(int(t.Id)),
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
	
	// 3. Request create Snap transaction to Midtrans
	snapResp, err := m.client.CreateTransaction(req)
	if err != nil {
		return err
	}
	t.SnapURL = snapResp.RedirectURL
	
	return nil
}

func (m midtransUseCase) VerifyPayment(ctx context.Context, data map[string]any) (bool, error) {
	var client coreapi.Client
	
	envi := midtrans.Sandbox
	if m.midtransConfig.IsProd {
		envi = midtrans.Production
	}
	client.New(m.midtransConfig.Key, envi)
	// 3. Get order-id from payload
	orderId, exists := data["order_id"].(string)
	if !exists {
		// do something when key `order_id` not found
		return false, errors.New("invalid payload")
	}
	
	// 4. Check transaction to Midtrans with param orderId
	transactionStatusResp, e := client.CheckTransaction(orderId)
	if e != nil {
		return false, e
	} else {
		if transactionStatusResp != nil {
			// 5. Do set transaction status based on response from check transaction status
			if transactionStatusResp.TransactionStatus == "capture" {
				if transactionStatusResp.FraudStatus == "challenge" {
					// TODO set transaction status on your database to 'challenge'
					// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
				} else if transactionStatusResp.FraudStatus == "accept" {
					return true, nil
				}
			} else if transactionStatusResp.TransactionStatus == "settlement" {
				return true, nil
			} else if transactionStatusResp.TransactionStatus == "deny" {
				// TODO you can ignore 'deny', because most of the time it allows payment retries
				// and later can become success
			} else if transactionStatusResp.TransactionStatus == "cancel" || transactionStatusResp.TransactionStatus == "expire" {
				// TODO set transaction status on your databaase to 'failure'
			} else if transactionStatusResp.TransactionStatus == "pending" {
				return true, nil
			}
		}
	}
	return false, nil
}
