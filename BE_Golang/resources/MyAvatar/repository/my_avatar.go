package repository

import (
	"context"
	"errors"
	"github.com/rdwansch/Trivia-Cap/domain"
	"gorm.io/gorm"
)

type myAvatarRepository struct {
	db *gorm.DB
}

func NewMyAvatarRepository(db *gorm.DB) domain.MyAvatarRepository {
	return &myAvatarRepository{db}
}

func (r *myAvatarRepository) GetMyAvatarByUserID(ctx context.Context, mAvatar *domain.MyAvatar) ([]domain.MyAvatar, error) {
	var myAvatars []domain.MyAvatar
	
	err := r.db.WithContext(ctx).Model(&mAvatar).Where("user_id = ?", mAvatar.UserID).Find(&myAvatars).Error
	if err != nil {
		return nil, err
	}
	
	return myAvatars, err
}

func (r *myAvatarRepository) AddAvatarToMyProfile(ctx context.Context, mAvatar *domain.MyAvatar) error {
	checkIfExist := r.db.WithContext(ctx).Where("id_avatar = ? AND user_id = ? ", mAvatar.IDAvatar, mAvatar.UserID).First(&mAvatar)
	if checkIfExist.RowsAffected > 0 {
		return errors.New("AIsExist")
	}
	err := r.db.WithContext(ctx).Create(mAvatar).Error
	if err != nil {
		return err
	}
	return nil
}
