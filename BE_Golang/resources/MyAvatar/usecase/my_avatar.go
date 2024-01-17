package usecase

import (
	"context"
	"fmt"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
)

type avatarUseCase struct {
	avatarRepository domain.MyAvatarRepository
	repositoryWallet domain.DiamondWalletRepository
}

func NewAvatarUseCase(avatarRepository domain.MyAvatarRepository, repositoryWallet domain.DiamondWalletRepository) domain.MyAvatarUseCase {
	return &avatarUseCase{avatarRepository, repositoryWallet}
}

func (u *avatarUseCase) GetMyAvatarByUserID(req dto.AvatarUserIDReq) ([]dto.AvatarResponse, error) {
	ctx := context.Background()
	
	newAvatar := domain.MyAvatar{
		UserID: req.UserID,
	}
	
	myAvatar, err := u.avatarRepository.GetMyAvatarByUserID(ctx, &newAvatar)
	if err != nil {
		return nil, err
	}
	
	var myAvatarReponses []dto.AvatarResponse
	
	for _, each := range myAvatar {
		var newData = dto.AvatarResponse{
			ID:       each.ID,
			Avatar:   each.Avatar,
			UserID:   each.UserID,
			IDAvatar: each.IDAvatar,
		}
		
		myAvatarReponses = append(myAvatarReponses, newData)
	}
	
	return myAvatarReponses, err
}

func (u *avatarUseCase) AddAvatarToMyProfile(request dto.AvatarRequest) error {
	ctx := context.Background()
	
	data, _ := u.repositoryWallet.FindByIdUser(ctx, request.UserID)
	if data.BalanceDiamond < request.Price {
		return fmt.Errorf("not enough diamond GOBLOG")
	}
	
	err := u.repositoryWallet.UpdateAfterPayAvatar(ctx, &domain.DiamondWallet{
		BalanceDiamond: request.Price,
		UserID:         request.UserID,
	})
	
	err = u.avatarRepository.AddAvatarToMyProfile(ctx, &domain.MyAvatar{
		Avatar:   request.Avatar,
		UserID:   request.UserID,
		IDAvatar: request.IDAvatar,
	})
	
	if err != nil {
		return err
	}
	
	fmt.Println("HARGGGAAA ====>> ", request.Price)
	
	return nil
}
