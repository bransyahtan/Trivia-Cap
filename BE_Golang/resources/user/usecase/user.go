package usecase

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	"github.com/rdwansch/Trivia-Cap/internal/utils"
)

type userUseCase struct {
	domain.UserRepository
	diamondWalletRepository domain.DiamondWalletRepository
	generateAccountNumber   utils.RandNumberService
	midtransService         domain.MidtransService
	myAvatarRepository      domain.MyAvatarRepository
}

func NewUserUseCase(ur domain.UserRepository, diamondWalletRepository domain.DiamondWalletRepository, generateAccountNumber utils.RandNumberService, midtransService domain.MidtransService, myAvatarRepository domain.MyAvatarRepository) domain.UserUseCase {
	return &userUseCase{ur, diamondWalletRepository, generateAccountNumber, midtransService, myAvatarRepository}
}

func (u *userUseCase) RegisterUser(user domain.User) (string, error) {
	ctx := context.Background()
	err := u.UserRepository.RegisterUser(ctx, user)
	
	userByEmail, _ := u.UserRepository.FindOne(ctx, user.Email)
	
	gNumber := u.generateAccountNumber.GenerateAccountNumber()
	
	wallet := domain.DiamondWallet{
		UserID:         userByEmail.Id,
		AccountNumber:  gNumber,
		BalanceDiamond: 0,
	}
	
	isExist := u.diamondWalletRepository.CheckUserByIdIsExist(ctx, userByEmail.Id)
	if !isExist {
		err = u.diamondWalletRepository.CreateWallet(ctx, &wallet)
		if err != nil {
			return "", err
		}
	}
	
	token := component.GenerateToken(userByEmail)
	
	return token, err
}

func (u *userUseCase) FetchUser() ([]domain.User, error) {
	ctx := context.Background()
	users, err := u.UserRepository.FetchUser(ctx)
	
	return users, err
}

func (u *userUseCase) FindOne(email string) (dto.UserResponseDetail, error) {
	ctx := context.Background()
	user, err := u.UserRepository.FindOne(ctx, email)
	
	return dto.UserResponseDetail{
		ID:     user.Id,
		Email:  user.Email,
		Name:   user.Name,
		Avatar: user.Avatar,
		Wallet: user.DiamondWallet.BalanceDiamond,
	}, err
}

func (u *userUseCase) UpdateProfile(req dto.UserUpdateProfileReq) (dto.UserResponseDetail, error) {
	ctx := context.Background()
	var newUser = domain.User{
		Id:     req.ID,
		Avatar: req.Avatar,
		Name:   req.Name,
	}
	
	nMAvatar := domain.MyAvatar{
		UserID:   req.ID,
		IDAvatar: req.IDAvatar,
		Avatar:   req.Avatar,
	}
	
	_ = u.myAvatarRepository.AddAvatarToMyProfile(ctx, &nMAvatar)
	
	user, err := u.UserRepository.UpdateProfile(ctx, &
		newUser)
	
	return dto.UserResponseDetail{
		ID:     user.Id,
		Email:  user.Email,
		Name:   user.Name,
		Avatar: user.Avatar,
	}, err
}
