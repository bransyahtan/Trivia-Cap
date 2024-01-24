package qz_service

import (
	"context"
	"encoding/json"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/internal/pb/quiz"
	//qzPb "github.com/rdwansch/Trivia-Cap/resources/quizes/dilevery/grpc/pb"
)

type quizesService struct {
	quiz.UnimplementedQuizzesServiceServer
	quizzesRepository domain.QuizzesRepository
}

func NewQuizzesService(quizzesRepository domain.QuizzesRepository) quiz.QuizzesServiceServer {
	return &quizesService{
		quizzesRepository: quizzesRepository,
	}
}

func (q *quizesService) FindAllQuiz(ctx context.Context, empty *quiz.Empty) (*quiz.Quizzes, error) {
	quizzesData, _ := q.quizzesRepository.GetDataRedis(ctx)
	
	var quizessDataRes domain.QuizzesResponse
	
	if err := json.Unmarshal([]byte(quizzesData), &quizessDataRes); err != nil {
		panic(err)
	}
	
	var quizzesResponse []*quiz.Quiz
	
	for _, q := range quizessDataRes.Data {
		var data = &quiz.Quiz{
			Id:        q.ID,
			Question:  q.Question,
			A:         q.A,
			B:         q.B,
			C:         q.C,
			Answer:    q.Answer,
			CreatedAt: q.CreatedAt,
			UpdatedAt: q.UpdatedAt,
		}
		
		quizzesResponse = append(quizzesResponse, data)
	}
	
	quizesResponse := quiz.Quizzes{
		Status: "OKE",
		Data:   quizzesResponse,
	}
	//fmt.Println(quizzes)
	return &quizesResponse, nil
}
