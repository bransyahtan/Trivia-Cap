package repository

import (
	"context"
	"errors"
	"github.com/rdwansch/Trivia-Cap/domain"
	"gorm.io/gorm"
)

type diamondWalletRepository struct {
	db *gorm.DB
}

func NewDiamondWalletRepository(db *gorm.DB) domain.DiamondWalletRepository {
	return &diamondWalletRepository{db}
}

func (r *diamondWalletRepository) FindByIdUser(ctx context.Context, id int64) (domain.DiamondWallet, error) {
	var domainDiamondWallet domain.DiamondWallet
	err := r.db.WithContext(ctx).Where("user_id = ?", id).First(&domainDiamondWallet).Error
	if err != nil {
		return domainDiamondWallet, err
	}
	
	return domainDiamondWallet, nil
}

func (r *diamondWalletRepository) FindByAccountNumber(ctx context.Context, accountNumber string) (domain.DiamondWallet, error) {
	var domainDiamondWallet domain.DiamondWallet
	err := r.db.WithContext(ctx).Where("account_number = ?", accountNumber).First(&domainDiamondWallet).Error
	if err != nil {
		return domainDiamondWallet, err
	}
	
	return domainDiamondWallet, nil
}

func (r *diamondWalletRepository) Update(ctx context.Context, diamondWallet *domain.DiamondWallet) error {
	
	var existingDiamondWallet domain.DiamondWallet
	err := r.db.WithContext(ctx).Where("user_id = ?", diamondWallet.UserID).First(&existingDiamondWallet).Error
	if err != nil {
		return err // Kesalahan saat mencari data, misalnya database error
	}
	
	if existingDiamondWallet.ID == 0 {
		return errors.New("Data tidak ditemukan") // Data tidak ditemukan di database
	}
	
	existingDiamondWallet.BalanceDiamond += diamondWallet.BalanceDiamond
	
	err = r.db.WithContext(ctx).Model(&diamondWallet).Where("user_id = ?", diamondWallet.UserID).Updates(map[string]interface{}{"balance_diamond": existingDiamondWallet.BalanceDiamond}).Error
	if err != nil {
		return err
	}
	
	return nil
}

func (r *diamondWalletRepository) CreateWallet(ctx context.Context, diamondWallet *domain.DiamondWallet) error {
	if err := r.db.WithContext(ctx).Create(diamondWallet).Error; err != nil {
		return err
	}
	
	return nil
}

func (r *diamondWalletRepository) CheckUserByIdIsExist(ctx context.Context, id int64) bool {
	dataWallet := r.db.WithContext(ctx).Where("user_id = ?", id).First(&domain.DiamondWallet{})
	if dataWallet.RowsAffected > 0 {
		return true
	}
	
	return false
}

func (r *diamondWalletRepository) UpdateAfterPayAvatar(ctx context.Context, diamondWallet *domain.DiamondWallet) error {
	var existingDiamondWallet domain.DiamondWallet
	err := r.db.WithContext(ctx).Where("user_id = ?", diamondWallet.UserID).First(&existingDiamondWallet).Error
	if err != nil {
		return err // Kesalahan saat mencari data, misalnya database error
	}
	
	if existingDiamondWallet.ID == 0 {
		return errors.New("Data tidak ditemukan") // Data tidak ditemukan di database
	}
	
	existingDiamondWallet.BalanceDiamond -= diamondWallet.BalanceDiamond
	
	err = r.db.WithContext(ctx).Model(&diamondWallet).Where("user_id = ?", diamondWallet.UserID).Updates(map[string]interface{}{"balance_diamond": existingDiamondWallet.BalanceDiamond}).Error
	if err != nil {
		return err
	}
	
	return nil
}
