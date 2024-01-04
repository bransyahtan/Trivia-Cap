package usecase

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/domain"
)

type userUseCase struct {
	domain.UserRepository
}

func NewUserUseCase(ur domain.UserRepository) domain.UserUseCase {
	return &userUseCase{ur}
}

func (u *userUseCase) RegisterUser(user domain.User) (domain.User, error) {
	ctx := context.Background()
	user, err := u.UserRepository.RegisterUser(ctx, user)

	return user, err
}

func (u *userUseCase) FetchUser() ([]domain.User, error) {
	ctx := context.Background()
	users, err := u.UserRepository.FetchUser(ctx)

	return users, err
}

func (u *userUseCase) FindOne(email string) (domain.User, error) {
	ctx := context.Background()
	user, err := u.UserRepository.FindOne(ctx, email)

	return user, err
}
