package usecase

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"github.com/rdwansch/Trivia-Cap/internal/utils"
	"time"
)

type topupUseCase struct {
	topUpRepository domain.TopUpRepository
	midtransService domain.MidtransService
	randNumber      utils.RandNumberService
}

func NewTopUpUseCase(topUpRepository domain.TopUpRepository, midtransService domain.MidtransService, randNumber utils.RandNumberService) domain.TopUpUseCase {
	return &topupUseCase{topUpRepository, midtransService, randNumber}
}

func (u topupUseCase) InitializeTopUp(ctx context.Context, req dto.TopupReq) (dto.TopupRes, error) {
	topup := domain.TopUp{
		Id:            u.randNumber.GenerateNumber(),
		IdUser:        req.IdUser,
		Amount:        req.Amount,
		AmountDiamond: req.AmountDiamond,
		Status:        0,
		CreatedAt:     time.Now(),
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
	}, nil
}

func (u topupUseCase) ConfirmedTopUp(ctx context.Context, email string) error {
	//TODO implement me
	panic("implement me")
}
