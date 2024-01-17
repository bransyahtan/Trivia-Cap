package dto

type UserResponseDetail struct {
	ID     int64  `json:"id"`
	Email  string `json:"email"`
	Name   string `json:"name"`
	Avatar string `json:"avatar"`
	Wallet uint64 `json:"wallet"`
}

type UserUpdateProfileReq struct {
	ID       int64  `json:"id"`
	Avatar   string `json:"avatar"`
	Name     string `json:"name"`
	IDAvatar int64  `json:"id_avatar"`
}
