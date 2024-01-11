package domain

import "context"

type Diamonds struct {
	Id        int64  `json:"id"`
	Price     int64  `json:"price"`
	Amount    int64  `json:"amount"`
	CreatedAt string `json:"created_at"`
	UpdateAt  string `json:"update_at"`
}

type DiamondsResponse struct {
	Status string    `json:"status"`
	Data   []Avatars `json:"data"`
}

type DiamondsRepository interface {
	SetDiamondToRedis()
	GetDataRedis(ctx context.Context) (string, error)
}

type DiamondsUseCase interface {
	ReDoDiamondRedis()
	GetDataRedisJson() (DiamondsResponse, error)
}
