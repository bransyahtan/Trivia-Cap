package domain

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/dto"
)

type User struct {
	Id            int64          `json:"id"`
	Email         string         `json:"email"`
	Name          string         `json:"name"`
	Avatar        string         `json:"avatar"`
	TopUp         []TopUp        `gorm:"foreignKey:IdUser;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	Notification  []Notification `gorm:"foreignKey:UserID;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	DiamondWallet DiamondWallet  `gorm:"foreignKey:UserID;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
}

type UserRepository interface {
	RegisterUser(ctx context.Context, user User) error
	FetchUser(ctx context.Context) ([]User, error)
	FindOne(ctx context.Context, email string) (User, error)
	UpdateProfile(ctx context.Context, userUpdate *User) (User, error)
}

type UserUseCase interface {
	RegisterUser(user User) (string, error)
	FetchUser() ([]User, error)
	FindOne(email string) (dto.UserResponseDetail, error)
	UpdateProfile(req dto.UserUpdateProfileReq) (dto.UserResponseDetail, error)
}
