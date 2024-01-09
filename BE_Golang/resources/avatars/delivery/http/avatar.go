package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	"net/http"
)

type avatarHandler struct {
	avatarUseCase domain.AvatarUseCase
}

func NewAvatarHandler(app *fiber.App, avatarUseCase domain.AvatarUseCase) {
	handler := &avatarHandler{
		avatarUseCase,
	}
	g := app.Group("/api/v1")
	g.Get("/avatars", component.TokenMiddleware(handler.GetAvatar))
}

func (h *avatarHandler) GetAvatar(c *fiber.Ctx) error {
	avatarData, err := h.avatarUseCase.GetDataRedisJson()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"err": err.Error(),
		})
	}
	
	return c.Status(http.StatusOK).JSON(avatarData)
}
