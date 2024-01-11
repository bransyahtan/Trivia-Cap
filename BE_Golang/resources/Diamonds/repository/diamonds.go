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

type diamondRepository struct {
	redisClient *redis.Client
	cnf         *config.Config
}

func NewDiamondRepository(redisCLient *redis.Client, cnf *config.Config) domain.DiamondsRepository {
	return &diamondRepository{
		redisClient: redisCLient,
		cnf:         cnf,
	}
}

func (r *diamondRepository) SetDiamondToRedis() {
	url := fmt.Sprintf("%s/api/diamonds", r.cnf.URLLARAVEL.URL)
	
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
	
	var diamondsData domain.DiamondsResponse
	
	err = json.NewDecoder(resp.Body).Decode(&diamondsData)
	if err != nil {
		panic(err)
	}
	
	ctx := context.Background()
	
	jsonString, _ := json.Marshal(diamondsData)
	
	err = r.redisClient.Set(ctx, "diamonds", jsonString, 600*time.Second).Err()
	
	if err != nil {
		panic(err)
	}
}

func (r *diamondRepository) GetDataRedis(ctx context.Context) (string, error) {
	dataDiamonds, err := r.redisClient.Get(ctx, "diamonds").Result()
	if err != nil {
		return "", err
	}
	
	return dataDiamonds, nil
}
