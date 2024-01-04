package repository

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/domain"
	"gorm.io/gorm"
)

type userRepository struct {
	*gorm.DB
}

func NewUserRepository(db *gorm.DB) domain.UserRepository {
	return &userRepository{db}
}

func (r *userRepository) RegisterUser(ctx context.Context, user domain.User) (domain.User, error) {
	//existingData := domain.User{}
	//r.DB.

	err := r.DB.WithContext(ctx).Create(&user).Error
	if err != nil {
		return domain.User{}, err
	}

	return user, nil
}

func (r *userRepository) FetchUser(ctx context.Context) ([]domain.User, error) {
	var users []domain.User

	err := r.DB.WithContext(ctx).Find(&users).Error
	if err != nil {
		return []domain.User{}, err
	}

	return users, nil
}

func (r *userRepository) FindOne(ctx context.Context, email string) (domain.User, error) {
	var user domain.User
	err := r.DB.WithContext(ctx).Where("email = ?", email).First(&user).Error
	if err != nil {
		return domain.User{}, err
	}

	return user, nil
}
