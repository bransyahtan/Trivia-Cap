package repository

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/domain"
	"gorm.io/gorm"
)

type transactionRepository struct {
	db *gorm.DB
}

func NewTransactionRepostory(db *gorm.DB) domain.TransactionRepository {
	return &transactionRepository{db}
}

func (r transactionRepository) Insert(ctx context.Context, transaction *domain.Transaction) error {
	err := r.db.WithContext(ctx).Create(&transaction).Error
	if err != nil {
		return err
	}
	return nil
}
