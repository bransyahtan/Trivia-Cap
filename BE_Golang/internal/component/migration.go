package component

import (
	"github.com/rdwansch/Trivia-Cap/domain"
	"gorm.io/gorm"
)

func migrate(db *gorm.DB) error {
	return db.AutoMigrate(&domain.User{},
		domain.TopUp{},
		domain.Notification{},
		domain.DiamondWallet{},
		domain.Transaction{})
}
