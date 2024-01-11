package usecase

import (
	"context"
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
}

func NewTopUpUseCase(topUpRepository domain.TopUpRepository, midtransService domain.MidtransService, randNumber utils.RandNumberService, walletRepository domain.DiamondWalletRepository) domain.TopUpUseCase {
	return &topupUseCase{topUpRepository, midtransService, randNumber, walletRepository}
}

func (u *topupUseCase) InitializeTopUp(ctx context.Context, req dto.TopupReq) (dto.TopupRes, error) {
	
	diamond, _ := u.walletRepository.FindByIdUser(ctx, req.IdUser)
	topup := domain.TopUp{
		IdUser:          req.IdUser,
		DiamondWalletID: diamond.ID,
		Amount:          req.Amount,
		OrderId:         strconv.FormatInt(u.randNumber.GenerateNumber(), 10),
		AmountDiamond:   req.AmountDiamond,
		Status:          "pending",
	}
	
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
