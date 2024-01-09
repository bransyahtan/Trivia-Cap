package repository

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/domain"
	"gorm.io/gorm"
)

type diamondWalletRepository struct {
	db *gorm.DB
}

func NewDiamondWalletRepository(db *gorm.DB) domain.DiamondWalletRepository {
	return &diamondWalletRepository{db}
}

func (r diamondWalletRepository) FindByIdUser(ctx context.Context, id int64) (domain.DiamondWallet, error) {
	var domainDiamondWallet domain.DiamondWallet
	err := r.db.WithContext(ctx).Where("user_id = ?", id).First(&domainDiamondWallet).Error
	if err != nil {
		return domainDiamondWallet, err
	}
	
	return domainDiamondWallet, nil
}

func (r diamondWalletRepository) FindByAccountNumber(ctx context.Context, accountNumber string) (domain.DiamondWallet, error) {
	var domainDiamondWallet domain.DiamondWallet
	err := r.db.WithContext(ctx).Where("account_number = ?", accountNumber).First(&domainDiamondWallet).Error
	if err != nil {
		return domainDiamondWallet, err
	}
	
	return domainDiamondWallet, nil
}

func (r diamondWalletRepository) Update(ctx context.Context, diamondWallet *domain.DiamondWallet) error {
	err := r.db.WithContext(ctx).Select("balance_diamond").Where("id = ?", diamondWallet.ID).First(&diamondWallet).Error
	if err != nil {
		return err
	}
	
	return nil
}

func (r diamondWalletRepository) CreateWallet(ctx context.Context, diamondWallet *domain.DiamondWallet) error {
	if err := r.db.WithContext(ctx).Create(diamondWallet).Error; err != nil {
		return err
	}
	
	return nil
}

func (r diamondWalletRepository) CheckUserByIdIsExist(ctx context.Context, id int64) bool {
	dataWallet := r.db.WithContext(ctx).Where("user_id = ?", id).First(&domain.DiamondWallet{})
	if dataWallet.RowsAffected > 0 {
		return true
	}
	
	return false
}
