package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	"net/http"
)

type userHandler struct {
	domain.UserUseCase
}

func NewUserHandler(app *fiber.App, uu domain.UserUseCase) {
	handler := &userHandler{uu}
	
	g := app.Group("/api/v1")
	g.Get("/user", handler.FetchUser)
	g.Post("/user", handler.RegisterUser)
	g.Get("/detail-user", component.TokenMiddleware(handler.FindOne))
	g.Put("/update-profile", component.TokenMiddleware(handler.UpdateProfile))
}

func (h *userHandler) FetchUser(c *fiber.Ctx) error {
	users, err := h.UserUseCase.FetchUser()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"code":   http.StatusOK,
		"Status": http.StatusText(http.StatusOK),
		"data":   users,
	})
}

func (h *userHandler) RegisterUser(c *fiber.Ctx) error {
	var newUser domain.User
	err := c.BodyParser(&newUser)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"code":   http.StatusBadRequest,
			"Status": http.StatusText(http.StatusBadRequest),
			"error":  err.Error(),
		})
	}
	
	token, err := h.UserUseCase.RegisterUser(newUser)
	if err != nil {
		if err.Error() == "1" {
			return c.Status(http.StatusOK).JSON(fiber.Map{
				"token":       token,
				"is_register": true,
			})
		}
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"code":   http.StatusInternalServerError,
			"Status": http.StatusText(http.StatusInternalServerError),
			"error":  err.Error(),
		})
	}
	
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"token": token,
	})
}

func (h *userHandler) FindOne(c *fiber.Ctx) error {
	payload := component.GetPayloadData(c)
	
	user, err := h.UserUseCase.FindOne(payload.Email)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"code":   http.StatusInternalServerError,
			"Status": http.StatusText(http.StatusInternalServerError),
			"error":  err.Error(),
		})
	}
	
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"code":   http.StatusOK,
		"Status": http.StatusText(http.StatusOK),
		"data":   user,
	})
}

func (h *userHandler) UpdateProfile(c *fiber.Ctx) error {
	var reqUpdate dto.UserUpdateProfileReq
	err := c.BodyParser(&reqUpdate)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"code":   http.StatusBadRequest,
			"Status": http.StatusText(http.StatusBadRequest),
			"error":  err.Error(),
		})
	}
	
	payload := component.GetPayloadData(c)
	
	reqUpdate = dto.UserUpdateProfileReq{
		ID:       payload.ID,
		Avatar:   reqUpdate.Avatar,
		Name:     reqUpdate.Name,
		IDAvatar: reqUpdate.IDAvatar,
	}
	
	response, err := h.UserUseCase.UpdateProfile(reqUpdate)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"code":   http.StatusInternalServerError,
			"Status": http.StatusText(http.StatusInternalServerError),
			"error":  err.Error(),
		})
	}
	
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"code":   http.StatusOK,
		"Status": http.StatusText(http.StatusOK),
		"data":   response,
	})
}
