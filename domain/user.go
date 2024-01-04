package domain

import "context"

type User struct {
	Id     int64  `json:"id"`
	Email  string `json:"email"`
	Name   string `json:"name"`
	Avatar string `json:"avatar"`
}

type UserRepository interface {
	RegisterUser(ctx context.Context, user User) (User, error)
	FetchUser(ctx context.Context) ([]User, error)
	FindOne(ctx context.Context, email string) (User, error)
}

type UserUseCase interface {
	RegisterUser(user User) (User, error)
	FetchUser() ([]User, error)
	FindOne(email string) (User, error)
}
