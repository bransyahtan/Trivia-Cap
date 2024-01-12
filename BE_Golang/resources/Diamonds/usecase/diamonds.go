package usecase

import (
	"context"
	"encoding/json"
	"github.com/rdwansch/Trivia-Cap/domain"
	"time"
)

type diamondsUseCase struct {
	diamondsRepository domain.DiamondsRepository
}

func NewDiamondsUseCase(diamondsRepository domain.DiamondsRepository) domain.DiamondsUseCase {
	return &diamondsUseCase{diamondsRepository}
}

func (u *diamondsUseCase) ReDoDiamondRedis() {
	u.diamondsRepository.SetDiamondToRedis()
	
	setAvatarTicker := time.NewTicker(600 * time.Second)
	
	defer setAvatarTicker.Stop()
	
	for {
		select {
		case <-setAvatarTicker.C:
			u.diamondsRepository.SetDiamondToRedis()
		}
	}
}

func (u *diamondsUseCase) GetDataRedisJson() (domain.DiamondsResponse, error) {
	ctx := context.Background()
	data, err := u.diamondsRepository.GetDataRedis(ctx)
	if err != nil {
		return domain.DiamondsResponse{}, err
	}
	
	var diamondData domain.DiamondsResponse
	
	err = json.Unmarshal([]byte(data), &diamondData)
	if err != nil {
		return domain.DiamondsResponse{}, err
	}
	
	return diamondData, nil
}
