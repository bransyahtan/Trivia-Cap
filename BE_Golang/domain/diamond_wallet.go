package domain

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/dto"
)

type DiamondWallet struct {
	ID             int64         `json:"id"`
	UserID         int64         `json:"user_id" gorm:"unique"`
	AccountNumber  string        `json:"account_number"`
	BalanceDiamond uint64        `json:"balance_diamond"`
	TopUp          []TopUp       `json:"top_up" gorm:"foreignKey:DiamondWalletID;references:ID"`
	Transactions   []Transaction `gorm:"foreignKey:DiamondWalletID;references:ID"`
}

type DiamondWalletRepository interface {
	FindByIdUser(ctx context.Context, id int64) (DiamondWallet, error)
	FindByAccountNumber(ctx context.Context, accountNumber string) (DiamondWallet, error)
	Update(ctx context.Context, diamondWallet *DiamondWallet) error
	CreateWallet(ctx context.Context, diamondWallet *DiamondWallet) error
	CheckUserByIdIsExist(ctx context.Context, id int64) bool
}

type DiamondWalletUseCase interface {
	FindById(id int64) (dto.WalletResponse, error)
	FindByAccountNumber(accountNumber string) (DiamondWallet, error)
	Update(updateWallet dto.WalletUpdateReq) (dto.WalletResponse, error)
	CreateWallet(createWallet dto.WalletReq) (dto.WalletResponse, error)
	UpdateAfterTopUp(updateWallet dto.WalletUpdateReq) error
}
