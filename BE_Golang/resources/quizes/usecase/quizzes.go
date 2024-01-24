package usecase

import (
	"context"
	"encoding/json"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"time"
)

type quizzesUseCase struct {
	quizzesRepository domain.QuizzesRepository
}

func NewQuizzesUseCase(quizzesRepository domain.QuizzesRepository) domain.QuizzesUseCase {
	return &quizzesUseCase{quizzesRepository}
}

func (u quizzesUseCase) ReDoQuizRedis() {
	u.quizzesRepository.SetQuizToRedis()
	
	setAvatarTicker := time.NewTicker(600 * time.Second)
	
	defer setAvatarTicker.Stop()
	
	for {
		select {
		case <-setAvatarTicker.C:
			u.quizzesRepository.SetQuizToRedis()
		}
	}
}

func (u quizzesUseCase) GetDataRedisJson() (dto.QuizzesResponse, error) {
	ctx := context.Background()
	data, err := u.quizzesRepository.GetDataRedis(ctx)
	if err != nil {
		return dto.QuizzesResponse{}, err
	}
	
	var quizessData domain.QuizzesResponse
	
	err = json.Unmarshal([]byte(data), &quizessData)
	if err != nil {
		return dto.QuizzesResponse{}, err
	}
	
	var newDtoQUiz []dto.QuizzesDTO
	
	for _, q := range quizessData.Data {
		data := dto.QuizzesDTO{
			ID:       q.ID,
			Question: q.Question,
			A:        q.A,
			B:        q.B,
			C:        q.C,
			Answer:   q.Answer,
		}
		
		newDtoQUiz = append(newDtoQUiz, data)
	}
	
	return dto.QuizzesResponse{
		Status: quizessData.Status,
		Data:   newDtoQUiz,
	}, nil
}
