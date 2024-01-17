package domain

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/dto"
)

type MidtransService interface {
	GenerateSnapURL(ctx context.Context, t *TopUp, detailCustomer dto.TopupReq) error
	GenerateSnapURLCoreAPI(ctx context.Context, t *TopUp, detailCustomer dto.TopupReq) error
	VerifyPayment(orderId string) (string, error)
}
