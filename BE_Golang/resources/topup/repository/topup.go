package repository

import (
	"context"
	"errors"
	"github.com/rdwansch/Trivia-Cap/domain"
	"gorm.io/gorm"
)

type topupRepository struct {
	db *gorm.DB
}

func NewTopUpRepository(db *gorm.DB) domain.TopUpRepository {
	return &topupRepository{db}
}

func (r *topupRepository) FindByEmail(ctx context.Context, email string) (domain.TopUp, error) {
	var topup domain.TopUp
	var topupByEmail = r.db.WithContext(ctx).Where("email = ?", email).First(&topup)
	if topupByEmail.RowsAffected == 0 {
		return domain.TopUp{}, errors.New("user not found")
	}
	
	if err := topupByEmail.Error; err != nil {
		return domain.TopUp{}, err
	}
	
	return topup, nil
}

func (r *topupRepository) Insert(ctx context.Context, topUp *domain.TopUp) error {
	err := r.db.WithContext(ctx).Create(&topUp).Error
	if err != nil {
		return err
	}
	
	return nil
}

func (r *topupRepository) Update(ctx context.Context, topUp *domain.TopUp) error {
	err := r.db.WithContext(ctx).Model(&topUp).Where("email = ?", topUp.IdUser).Updates(&topUp).Error
	if err != nil {
		return err
	}
	
	return nil
}

func (r *topupRepository) FindTUByOrderID(ctx context.Context, topUp *domain.TopUp) (domain.TopUp, error) {
	err := r.db.WithContext(ctx).Where("order_id = ?", topUp.OrderId).First(&topUp).Error
	if err != nil {
		return domain.TopUp{}, err
	}
	
	return *topUp, nil
}
