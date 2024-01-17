package domain

import (
	"context"
	"time"
)

type Notification struct {
	ID        int64     `json:"id"`
	UserID    int64     `json:"user_id"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	Status    int8      `json:"status"`
	IsRead    int8      `json:"is_read"`
	CreatedAt time.Time `json:"created_at"`
}

type NotificationRepository interface {
	CreateNotfication(ctx context.Context, notification *Notification) error
	GetNotification(ctx context.Context) ([]Notification, error)
	GetNotificationByUserId(ctx context.Context, userId int64) ([]Notification, error)
}
