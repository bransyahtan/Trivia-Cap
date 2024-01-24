package repository

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/internal/config"
	"github.com/redis/go-redis/v9"
	"io"
	"net/http"
	"time"
)

type quizzesRepository struct {
	redisClient *redis.Client
	cnf         *config.Config
}

func NewQuizzesRepository(redisClient *redis.Client, cnf *config.Config) domain.QuizzesRepository {
	return &quizzesRepository{
		redisClient: redisClient,
		cnf:         cnf,
	}
}

func (r quizzesRepository) SetQuizToRedis() {
	url := fmt.Sprintf("%s/api/quizes", r.cnf.URLLARAVEL.URL)
	
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	
	defer func(body io.ReadCloser) {
		err := body.Close()
		if err != nil {
			panic(err)
		}
	}(resp.Body)
	
	var quizzes domain.QuizzesResponse
	
	err = json.NewDecoder(resp.Body).Decode(&quizzes)
	if err != nil {
		panic(err)
	}
	
	ctx := context.Background()
	
	jsonString, _ := json.Marshal(quizzes)
	
	err = r.redisClient.Set(ctx, "quizzes", jsonString, 600*time.Second).Err()
	
	if err != nil {
		panic(err)
	}
}

func (r quizzesRepository) GetDataRedis(ctx context.Context) (string, error) {
	dataQuizzes, err := r.redisClient.Get(ctx, "quizzes").Result()
	if err != nil {
		return "", err
	}
	
	return dataQuizzes, nil
}
