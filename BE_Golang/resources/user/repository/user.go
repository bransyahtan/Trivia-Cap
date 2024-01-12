package repository

import (
	"context"
	"errors"
	"fmt"
	"github.com/rdwansch/Trivia-Cap/domain"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type userRepository struct {
	*gorm.DB
}

func NewUserRepository(db *gorm.DB) domain.UserRepository {
	return &userRepository{db}
}

func (r *userRepository) RegisterUser(ctx context.Context, user domain.User) error {
	checkingEmail := r.DB.WithContext(ctx).Where("email = ?", user.Email).First(&user).RowsAffected
	if checkingEmail > 0 {
		return errors.New("1")
	}
	
	err := r.DB.WithContext(ctx).Create(&user).Error
	if err != nil {
		return err
	}
	
	//fmt.Println(user)
	return nil
}

func (r *userRepository) FetchUser(ctx context.Context) ([]domain.User, error) {
	var users []domain.User
	
	err := r.DB.WithContext(ctx).Preload(clause.Associations).Order("id desc").Find(&users).Error
	if err != nil {
		return []domain.User{}, err
	}
	
	return users, nil
}

func (r *userRepository) FindOne(ctx context.Context, email string) (domain.User, error) {
	var user domain.User
	fmt.Println(email)
	err := r.DB.WithContext(ctx).Preload("DiamondWallet").Where("email = ?", email).First(&user).Error
	if err != nil {
		return domain.User{}, err
	}
	
	return user, nil
}

func (r *userRepository) UpdateProfile(ctx context.Context, userUpdate *domain.User) (domain.User, error) {
	err := r.DB.WithContext(ctx).Model(&userUpdate).Where("id = ?", userUpdate.Id).Updates(&userUpdate).Error
	if err != nil {
		return domain.User{}, err
	}
	
	return *userUpdate, nil
}
