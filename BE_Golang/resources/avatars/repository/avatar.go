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

type avatarRepository struct {
	redisClient *redis.Client
	cnf         *config.Config
}

func NewAvatarRepository(redisClient *redis.Client, cnf *config.Config) domain.AvatarRepository {
	return &avatarRepository{
		redisClient: redisClient,
		cnf:         cnf,
	}
}

func (r *avatarRepository) SetAvatarToRedis() {
	url := fmt.Sprintf("%s/api/avatars", r.cnf.URLLARAVEL.URL)
	
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
	
	var avatarData domain.AvatarsResponse
	
	err = json.NewDecoder(resp.Body).Decode(&avatarData)
	if err != nil {
		panic(err)
	}
	
	ctx := context.Background()
	
	jsonString, _ := json.Marshal(avatarData)
	
	err = r.redisClient.Set(ctx, "avatar", jsonString, 600*time.Second).Err()
	
	if err != nil {
		panic(err)
	}
	
}

func (r *avatarRepository) GetDataRedis(ctx context.Context) (string, error) {
	dataAvatar, err := r.redisClient.Get(ctx, "avatar").Result()
	if err != nil {
		return "", err
	}
	
	return dataAvatar, nil
}
