package domain

type Quizes struct {
	ID        int64  `json:"id"`
	Question  string `json:"question"`
	A         string `json:"a"`
	B         string `json:"b"`
	C         string `json:"c"`
	Answer    string `json:"answer"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type QuizzesResponse struct {
	Status string   `json:"status"`
	Data   []Quizes `json:"data"`
}
