package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rdwansch/Trivia-Cap/domain"
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
	g.Get("/user/:email", handler.FindOne)
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

	user, err := h.UserUseCase.RegisterUser(newUser)
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

func (h *userHandler) FindOne(c *fiber.Ctx) error {
	var email = c.Params("email")
	user, err := h.UserUseCase.FindOne(email)
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
