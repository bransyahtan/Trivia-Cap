package domain

type Assets struct {
	Id         int64  `json:"id"`
	FullName   string `json:"full_name"`
	CobaUpload string `json:"coba_upload"`
}
