package dto

type TransferInquiryReq struct {
	AccountNumber string `json:"account_number"`
	Amount        string `json:"amount"`
}

type TransferInquiryRes struct {
	InquiryKey string `json:"inquiry_key"`
}

type TransferInquiryExecuteReq struct {
	InquiryKey string `json:"inquiry_key"`
}
