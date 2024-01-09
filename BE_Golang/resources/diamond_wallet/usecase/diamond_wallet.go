package usecase

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"github.com/rdwansch/Trivia-Cap/internal/utils"
)

type diamondWalletUseCase struct {
	diamondRepository domain.DiamondWalletRepository
	randNumberService utils.RandNumberService
}

func NewDiamondWalletUseCase(diamondRepository domain.DiamondWalletRepository, randNumberService utils.RandNumberService) domain.DiamondWalletUseCase {
	return &diamondWalletUseCase{diamondRepository, randNumberService}
}

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
	var domainWallet = domain.DiamondWallet{
		UserID:         updateWallet.UserId,
		BalanceDiamond: updateWallet.BalanceDiamond,
	}
	err := u.diamondRepository.Update(ctx, &domainWallet)
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
