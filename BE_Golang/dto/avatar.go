package dto

type AvatarUserIDReq struct {
	UserID int64 `json:"user_id"`
}

type AvatarResponse struct {
	ID       int64  `json:"id"`
	Avatar   string `json:"avatar"`
	UserID   int64  `json:"user_id"`
	IDAvatar int64  `json:"id_avatar"`
}

type AvatarRequest struct {
	Avatar   string `json:"avatar"`
	UserID   int64  `json:"user_id"`
	IDAvatar int64  `json:"id_avatar"`
	Price    uint64 `json:"price"`
}
