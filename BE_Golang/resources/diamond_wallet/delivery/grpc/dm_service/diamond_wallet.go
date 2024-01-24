package dm_service

import (
	"context"
	"fmt"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/internal/pb/diamond_wallet"
)

type diamondWalletService struct {
	diamond_wallet.UnimplementedDiamondWalletServiceServer
	diamondWalletRepository domain.DiamondWalletRepository
}

func NewDiamondWalletService(diamondWalletRepository domain.DiamondWalletRepository) diamond_wallet.DiamondWalletServiceServer {
	return &diamondWalletService{
		diamondWalletRepository: diamondWalletRepository,
	}
}

func (s *diamondWalletService) DetailWalletByUserID(ctx context.Context, in *diamond_wallet.UserID) (*diamond_wallet.DiamondWalletDetail, error) {
	diamondWalletData, err := s.diamondWalletRepository.FindByIdUser(ctx, in.UserId)
	if err != nil {
		return nil, err
	}
	
	var resDetailWallet = &diamond_wallet.DiamondWallet{
		Id:             diamondWalletData.ID,
		UserId:         diamondWalletData.UserID,
		AccountNumber:  diamondWalletData.AccountNumber,
		BalanceDiamond: diamondWalletData.BalanceDiamond,
	}
	
	return &diamond_wallet.DiamondWalletDetail{
		Status: "success",
		Data:   resDetailWallet,
	}, err
}

func (s *diamondWalletService) UpdateDiamondWallet(ctx context.Context, in *diamond_wallet.UpdateDiamondReq) (*diamond_wallet.StatusOK, error) {
	fmt.Println("LONTE LO")
	
	var newDataDiamond = domain.DiamondWallet{
		UserID:         in.UserId,
		BalanceDiamond: in.BalanceDiamond,
	}
	
	err := s.diamondWalletRepository.Update(ctx, &newDataDiamond)
	if err != nil {
		return nil, err
	}
	
	return &diamond_wallet.StatusOK{
		Message: "success",
	}, nil
}
