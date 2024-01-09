package http

import (
	"encoding/json"
	"github.com/gofiber/fiber/v2"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	"github.com/rdwansch/Trivia-Cap/internal/microservice"
	"io"
	"log"
	"net/http"
)

type quizesHandler struct {
}

func NewQuizesHandler(app *fiber.App) {
	handler := &quizesHandler{}
	g := app.Group("/api/v1")
	g.Get("/quizes", component.TokenMiddleware(handler.GetQuizes))
}

func (h *quizesHandler) GetQuizes(c *fiber.Ctx) error {
	resp, err := http.Get(microservice.BaseUrlQuizes.UrlGet)
	if err != nil {
		panic(err)
	}
	
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			panic(err)
		}
	}(resp.Body)
	
	var quizesRepsponse domain.QuizzesResponse
	
	err = json.NewDecoder(resp.Body).Decode(&quizesRepsponse)
	if err != nil {
		log.Println("Gagal mendekode respons JSON:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Terjadi kesalahan saat memproses data",
		})
	}
	
	//var payload dto.UserPayload
	
	return c.Status(http.StatusOK).JSON(quizesRepsponse)
	
}
