package microservice

import "github.com/rdwansch/Trivia-Cap/internal/config"

type Avatar struct {
	UrlGet string
}

var BaseUrlAvatar = Avatar{
	UrlGet: config.Get().URLLARAVEL.URL,
}
