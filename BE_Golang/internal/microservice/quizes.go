package microservice

import "github.com/rdwansch/Trivia-Cap/internal/config"

type Quizes struct {
	UrlGet string
}

var BaseUrlQuizes = Quizes{
	UrlGet: config.Get().URLLARAVEL.URL,
}
