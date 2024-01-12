package domain

import "context"

type Diamonds struct {
	Id        int64  `json:"id"`
	Price     int64  `json:"price"`
	Amount    int64  `json:"amount"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type DiamondsResponse struct {
	Status string     `json:"status"`
	Data   []Diamonds `json:"data"`
}

type DiamondsRepository interface {
	SetDiamondToRedis()
	GetDataRedis(ctx context.Context) (string, error)
}

type DiamondsUseCase interface {
	ReDoDiamondRedis()
	GetDataRedisJson() (DiamondsResponse, error)
}
