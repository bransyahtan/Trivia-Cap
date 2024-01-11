package domain

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/dto"
	"time"
)

type MyAvatar struct {
	ID        int64     `json:"id"`
	Avatar    string    `json:"avatar"`
	UserID    int64     `json:"user_id"`
	IDAvatar  int64     `json:"id_avatar"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type MyAvatarRepository interface {
	GetMyAvatarByUserID(ctx context.Context, mAvatar *MyAvatar) ([]MyAvatar, error)
	AddAvatarToMyProfile(ctx context.Context, mAvatar *MyAvatar) error
}

type MyAvatarUseCase interface {
	GetMyAvatarByUserID(req dto.AvatarUserIDReq) ([]dto.AvatarResponse, error)
	AddAvatarToMyProfile(request dto.AvatarRequest) error
}
