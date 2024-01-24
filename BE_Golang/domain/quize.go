package domain

import (
	"context"
	"github.com/rdwansch/Trivia-Cap/dto"
)

type Quizes struct {
	ID        int64  `json:"id"`
	Question  string `json:"question"`
	A         string `json:"a"`
	B         string `json:"b"`
	C         string `json:"c"`
	Answer    string `json:"answer"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type QuizzesResponse struct {
	Status string   `json:"status"`
	Data   []Quizes `json:"data"`
}

type QuizzesRepository interface {
	SetQuizToRedis()
	GetDataRedis(ctx context.Context) (string, error)
}

type QuizzesUseCase interface {
	ReDoQuizRedis()
	GetDataRedisJson() (dto.QuizzesResponse, error)
}
