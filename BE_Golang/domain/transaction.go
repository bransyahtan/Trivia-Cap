package domain

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/dto"
	"time"
)

type Transaction struct {
	ID                  int64     `json:"id"`
	DiamondWalletID     int64     `json:"diamond_wallet_id"`
	SofNumber           string    `json:"sof_number"`
	DofNumber           string    `json:"dof_number"`
	TransactionType     string    `json:"transaction_type"`
	Amount              uint64    `json:"amount"`
	TransactionDateTime time.Time `json:"transaction_date_time"`
}

type TransactionRepository interface {
	Insert(ctx context.Context, transaction *Transaction) error
}

type TransactionUseCase interface {
	TransferInquery(ctx context.Context, req dto.TransferInquiryReq) (dto.TransferInquiryRes, error)
	TransferExecute(ctx context.Context, req dto.TransferInquiryExecuteReq) error
}
