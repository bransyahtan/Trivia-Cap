package domain

import (
	"context"
)

type Avatars struct {
	ID        int64  `json:"id"`
	Name      string `json:"name"`
	Price     uint64 `json:"price"`
	IsPremium bool   `json:"is_premium"`
	ImageURL  string `json:"image_url"`
	CreatedAt string `json:"created_at"`
	UpdateAt  string `json:"update_at"`
}

type AvatarsResponse struct {
	Status string    `json:"status"`
	Data   []Avatars `json:"data"`
}

type AvatarRepository interface {
	SetAvatarToRedis()
	GetDataRedis(ctx context.Context) (string, error)
}

type AvatarUseCase interface {
	ReDoAvatarRedis()
	GetDataRedisJson() (AvatarsResponse, error)
}
