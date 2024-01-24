package usecase

import (
	"context"
	"fmt"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"github.com/rdwansch/Trivia-Cap/internal/utils"
)

type diamondWalletUseCase struct {
	diamondRepository domain.DiamondWalletRepository
	randNumberService utils.RandNumberService
	midtransService   domain.MidtransService
	topUpRepository   domain.TopUpRepository
}

func NewDiamondWalletUseCase(diamondRepository domain.DiamondWalletRepository, randNumberService utils.RandNumberService, midtransService domain.MidtransService, topUpRepository domain.TopUpRepository) domain.DiamondWalletUseCase {
	return &diamondWalletUseCase{
		diamondRepository,
		randNumberService,
		midtransService,
		topUpRepository,
	}
}

var listenChannel = make(chan dto.WalletResponse)

func (u *diamondWalletUseCase) FindById(id int64) (dto.WalletResponse, error) {
	var ctx = context.Background()
	diamondWallet, err := u.diamondRepository.FindByIdUser(ctx, id)
	if err != nil {
		return dto.WalletResponse{}, err
	}
	
	return dto.WalletResponse{
		ID:             diamondWallet.ID,
		UserId:         diamondWallet.UserID,
		AccountNumber:  diamondWallet.AccountNumber,
		BalanceDiamond: diamondWallet.BalanceDiamond,
	}, nil
}

func (u *diamondWalletUseCase) ListenDiamondWallet(send *dto.PaymentNotificationSend) (dto.WalletResponse, error) {
	ctx := context.Background()
	
	fmt.Println("masuk listen", <-listenChannel)
	
	go func() {
		diamondWallet, _ := u.diamondRepository.FindByIdUser(ctx, send.UserId)
		
		for {
			select {
			case value := <-listenChannel:
				fmt.Println(value)
			default:
				listenChannel <- dto.WalletResponse{
					ID:             diamondWallet.ID,
					UserId:         diamondWallet.UserID,
					AccountNumber:  diamondWallet.AccountNumber,
					BalanceDiamond: diamondWallet.BalanceDiamond,
				}
			}
		}
	}()
	
	//if err != nil {
	//	log.Println("Error listening:", err)
	//	time.Sleep(500 * time.Millisecond)
	//} else {
	//	listenChannel <- dto.WalletResponse{
	//		ID:             diamondWallet.ID,
	//		UserId:         diamondWallet.UserID,
	//		AccountNumber:  diamondWallet.AccountNumber,
	//		BalanceDiamond: diamondWallet.BalanceDiamond,
	//	}
	//}
	//
	//labelBreak:
	//	select {
	//	case <-ctx.Done():
	//		break labelBreak
	//	case <-listenChannel:
	//		listenChannel <- dto.WalletResponse{
	//			ID:             diamondWallet.ID,
	//			UserId:         diamondWallet.UserID,
	//			AccountNumber:  diamondWallet.AccountNumber,
	//			BalanceDiamond: diamondWallet.BalanceDiamond,
	//		}
	//	}
	
	//if listenChannel == nil {
	//	go func() {
	//		//label
	//		diamondWallet, err := u.diamondRepository.FindByIdUser(ctx, send.UserId)
	//		if err != nil {
	//			log.Println("Error listening:", err)
	//			time.Sleep(500 * time.Millisecond)
	//		} else {
	//			listenChannel <- dto.WalletResponse{
	//				ID:             diamondWallet.ID,
	//				UserId:         diamondWallet.UserID,
	//				AccountNumber:  diamondWallet.AccountNumber,
	//				BalanceDiamond: diamondWallet.BalanceDiamond,
	//			}
	//		}
	//
	//	}()
	//}
	
	return <-listenChannel, nil
}

func (u *diamondWalletUseCase) FindByAccountNumber(accountNumber string) (domain.DiamondWallet, error) {
	var ctx = context.Background()
	
	diamondWallet, err := u.diamondRepository.FindByAccountNumber(ctx, accountNumber)
	if err != nil {
		return domain.DiamondWallet{}, err
	}
	
	return diamondWallet, nil
}

func (u *diamondWalletUseCase) Update(updateWallet dto.WalletUpdateReq) (dto.WalletResponse, error) {
	var ctx = context.Background()
	var daimond = domain.DiamondWallet{
		UserID:         updateWallet.UserId,
		BalanceDiamond: updateWallet.BalanceDiamond,
	}
	
	fmt.Println("Di =>", daimond)
	
	err := u.diamondRepository.Update(ctx, &daimond)
	if err != nil {
		return dto.WalletResponse{}, err
	}
	
	return dto.WalletResponse{
		UserId:         updateWallet.UserId,
		BalanceDiamond: updateWallet.BalanceDiamond,
	}, nil
}

func (u *diamondWalletUseCase) CreateWallet(createWallet dto.WalletReq) (dto.WalletResponse, error) {
	var ctx = context.Background()
	createAccountNumber := u.randNumberService.GenerateAccountNumber()
	var domainWallet = domain.DiamondWallet{
		UserID:         createWallet.UserId,
		AccountNumber:  createAccountNumber,
		BalanceDiamond: createWallet.BalanceDiamond,
	}
	err := u.diamondRepository.CreateWallet(ctx, &domainWallet)
	if err != nil {
		return dto.WalletResponse{}, err
	}
	
	return dto.WalletResponse{
		UserId:         createWallet.UserId,
		AccountNumber:  createAccountNumber,
		BalanceDiamond: createWallet.BalanceDiamond,
	}, nil
}

func (u *diamondWalletUseCase) UpdateAfterTopUp(updateWallet dto.WalletUpdateReq) error {
	ctx := context.Background()
	
	orderID := updateWallet.OrderId
	
	tuOrderID := domain.TopUp{OrderId: orderID}
	
	tuData, err := u.topUpRepository.FindTUByOrderID(ctx, &tuOrderID)
	if err != nil {
		return err
	}
	
	status, err := u.midtransService.VerifyPayment(orderID)
	if err != nil {
		return err
	}
	
	if status == "settlement" {
		//go func() {
		//	//label
		//	diamondWallet, err := u.diamondRepository.FindByIdUser(ctx, tuData.IdUser)
		//	if err != nil {
		//		log.Println("Error listening:", err)
		//		time.Sleep(500 * time.Millisecond)
		//	} else {
		//		listenChannel <- dto.WalletResponse{
		//			ID:             diamondWallet.ID,
		//			UserId:         diamondWallet.UserID,
		//			AccountNumber:  diamondWallet.AccountNumber,
		//			BalanceDiamond: diamondWallet.BalanceDiamond,
		//		}
		//	}
		//
		//}()
		err := u.diamondRepository.Update(ctx, &domain.DiamondWallet{
			UserID:         tuData.IdUser,
			BalanceDiamond: uint64(tuData.AmountDiamond),
		})
		
		return err
	}
	
	return nil
}
