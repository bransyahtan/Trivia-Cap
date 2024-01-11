package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	"net/http"
)

type myAvatarHandler struct {
	myAvatarUseCase domain.MyAvatarUseCase
}

func NewMyAvatarHandler(app *fiber.App, mah domain.MyAvatarUseCase) {
	handler := &myAvatarHandler{mah}
	g := app.Group("/api/v1")
	g.Get("/my-avatars", component.TokenMiddleware(handler.GetMyAvatar))
	g.Post("/add-avatar", component.TokenMiddleware(handler.AddAvatarToMyProfile))
	
}

func (h *myAvatarHandler) GetMyAvatar(c *fiber.Ctx) error {
	payload := component.GetPayloadData(c)
	
	var idUser = dto.AvatarUserIDReq{
		UserID: payload.ID,
	}
	
	data, err := h.myAvatarUseCase.GetMyAvatarByUserID(idUser)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"status": http.StatusInternalServerError,
			"error":  err.Error(),
		})
	}
	
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status": http.StatusOK,
		"data":   data,
	})
}

func (h *myAvatarHandler) AddAvatarToMyProfile(c *fiber.Ctx) error {
	var avatarReq dto.AvatarRequest
	err := c.BodyParser(&avatarReq)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"status": http.StatusBadRequest,
			"error":  err.Error(),
		})
	}
	
	payload := component.GetPayloadData(c)
	
	newData := dto.AvatarRequest{
		UserID:   payload.ID,
		Avatar:   avatarReq.Avatar,
		IDAvatar: avatarReq.IDAvatar,
	}
	err = h.myAvatarUseCase.AddAvatarToMyProfile(newData)
	if err != nil {
		if err.Error() == "AIsExist" {
			return c.Status(http.StatusOK).JSON(fiber.Map{
				"message": "ok",
			})
		}
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"status": http.StatusInternalServerError,
			"error":  err.Error(),
		})
	}
	
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status": http.StatusOK,
	})
}
