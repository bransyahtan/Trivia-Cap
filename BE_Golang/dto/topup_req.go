package dto

type TopupReq struct {
	Amount        float64 `json:"amount"`
	AmountDiamond uint32  `json:"amount_diamond"`
	IdUser        int64   `json:"id_user"`
	Name          string  `json:"name"`
	Email         string  `json:"email"`
}
