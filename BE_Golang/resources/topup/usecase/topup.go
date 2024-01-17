package usecase

import (
	"context"
	"fmt"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"github.com/rdwansch/Trivia-Cap/internal/utils"
	"strconv"
)

type topupUseCase struct {
	topUpRepository  domain.TopUpRepository
	midtransService  domain.MidtransService
	randNumber       utils.RandNumberService
	walletRepository domain.DiamondWalletRepository
	userRepository   domain.UserRepository
}

func NewTopUpUseCase(topUpRepository domain.TopUpRepository, midtransService domain.MidtransService, randNumber utils.RandNumberService, walletRepository domain.DiamondWalletRepository, userRepository domain.UserRepository) domain.TopUpUseCase {
	return &topupUseCase{topUpRepository, midtransService, randNumber, walletRepository, userRepository}
}

func (u *topupUseCase) InitializeTopUp(ctx context.Context, req dto.TopupReq) (dto.TopupRes, error) {
	
	walletDetail, _ := u.walletRepository.FindByIdUser(ctx, req.IdUser)
	topup := domain.TopUp{
		IdUser:          req.IdUser,
		DiamondWalletID: walletDetail.ID,
		Amount:          req.Amount,
		OrderId:         strconv.FormatInt(u.randNumber.GenerateNumber(), 10),
		AmountDiamond:   req.AmountDiamond,
		Status:          "pending",
	}
	
	userName, _ := u.userRepository.FindOne(ctx, req.Email)
	
	fmt.Println("Nama ORanggg >>>>>>>", userName.Name)
	req.Name = userName.Name
	
	err := u.midtransService.GenerateSnapURL(ctx, &topup, req)
	if err != nil {
		return dto.TopupRes{}, err
	}
	
	err = u.topUpRepository.Insert(ctx, &topup)
	if err != nil {
		return dto.TopupRes{}, err
	}
	
	return dto.TopupRes{
		SnapURL: topup.SnapURL,
		Token:   topup.Token,
	}, nil
}

func (u *topupUseCase) ConfirmedTopUp(ctx context.Context, email string) error {
	//TODO implement me
	panic("implement me")
}

func (u *topupUseCase) FindTuByOrderID(orderID string) (domain.TopUp, error) {
	ctx := context.Background()
	
	topUpData := domain.TopUp{
		OrderId: orderID,
	}
	
	topUpData, err := u.topUpRepository.FindTUByOrderID(ctx, &topUpData)
	if err != nil {
		return topUpData, err
	}
	
	return topUpData, nil
	
}
