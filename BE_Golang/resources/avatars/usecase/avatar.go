package usecase

import (
	"context"
	"encoding/json"
	"github.com/rdwansch/Trivia-Cap/domain"
	"time"
)

type avatarUseCase struct {
	avatarRepository domain.AvatarRepository
}

func NewAvatarUseCase(avatarRepository domain.AvatarRepository) domain.AvatarUseCase {
	return &avatarUseCase{avatarRepository}
}

func (u *avatarUseCase) ReDoAvatarRedis() {
	
	u.avatarRepository.SetAvatarToRedis()
	
	setAvatarTicker := time.NewTicker(600 * time.Second)
	
	defer setAvatarTicker.Stop()
	
	for {
		select {
		case <-setAvatarTicker.C:
			u.avatarRepository.SetAvatarToRedis()
		}
	}
	
}

func (u *avatarUseCase) GetDataRedisJson() (domain.AvatarsResponse, error) {
	ctx := context.Background()
	data, err := u.avatarRepository.GetDataRedis(ctx)
	if err != nil {
		return domain.AvatarsResponse{}, err
	}
	
	var avatarData domain.AvatarsResponse
	
	err = json.Unmarshal([]byte(data), &avatarData)
	if err != nil {
		return domain.AvatarsResponse{}, err
	}
	
	return avatarData, nil
	
}
