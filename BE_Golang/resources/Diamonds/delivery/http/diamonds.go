package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	"net/http"
)

type diamondHandler struct {
	diamondUseCase domain.DiamondsUseCase
}

func NewDiamondHandler(app *fiber.App, diamondUseCase domain.DiamondsUseCase) {
	handler := &diamondHandler{
		diamondUseCase,
	}
	g := app.Group("/api/v1")
	g.Get("/diamonds", component.TokenMiddleware(handler.GetDiamond))
}

func (h *diamondHandler) GetDiamond(c *fiber.Ctx) error {
	diamondData, err := h.diamondUseCase.GetDataRedisJson()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"err": err.Error(),
		})
	}
	
	return c.Status(http.StatusOK).JSON(diamondData)
}
