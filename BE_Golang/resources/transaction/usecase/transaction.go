package usecase

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
)

type transactionUseCase struct {
	walletRepository      domain.DiamondWalletRepository
	transactionRepository domain.TransactionRepository
}

func NewTransactionUseCase(walletRepository domain.DiamondWalletRepository, transactionRepository domain.TransactionRepository) domain.TransactionUseCase {
	return &transactionUseCase{walletRepository, transactionRepository}
}

func (u *transactionUseCase) TransferInquery(ctx context.Context, req dto.TransferInquiryReq) (dto.TransferInquiryRes, error) {
	//userPayload := ctx.Locals("user")
	//userData := component.GetPayloadData(userPayload)
	_, err := u.walletRepository.FindById(ctx, 4)
	if err != nil {
		return dto.TransferInquiryRes{}, err
	}
	
	inquiryKeyNew := "888999988889999922"
	
	return dto.TransferInquiryRes{
		InquiryKey: inquiryKeyNew,
	}, nil
}

func (u *transactionUseCase) TransferExecute(ctx context.Context, req dto.TransferInquiryExecuteReq) error {
	//TODO implement me
	panic("implement me")
}
