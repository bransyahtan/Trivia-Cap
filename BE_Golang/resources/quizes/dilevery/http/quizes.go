package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rdwansch/Trivia-Cap/domain"
	"net/http"
)

type quizesHandler struct {
	quizzesHandler domain.QuizzesUseCase
}

func NewQuizesHandler(app *fiber.App, qh domain.QuizzesUseCase) {
	handler := &quizesHandler{
		qh,
	}
	g := app.Group("/api/v1")
	g.Get("/quizes", handler.GetQuizes)
}

func (h *quizesHandler) GetQuizes(c *fiber.Ctx) error {
	quizzesData, err := h.quizzesHandler.GetDataRedisJson()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"err": err.Error(),
		})
	}
	
	//var payload dto.UserPayload
	
	return c.Status(http.StatusOK).JSON(quizzesData)
	
}
