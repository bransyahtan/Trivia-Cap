package dto

type WalletReq struct {
	UserId         int64  `json:"user_id"`
	AccountNumber  string `json:"account_number"`
	BalanceDiamond uint64 `json:"balance_diamond"`
}

type WalletResponse struct {
	ID             int64  `json:"id"`
	UserId         int64  `json:"user_id"`
	AccountNumber  string `json:"account_number"`
	BalanceDiamond uint64 `json:"balance_diamond"`
}

type WalletUpdateReq struct {
	UserId         int64  `json:"user_id"`
	BalanceDiamond uint64 `json:"balance_diamond"`
	OrderId        string `json:"order_id"`
}
