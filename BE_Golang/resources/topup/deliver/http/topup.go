package http

import (
	"context"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	"net/http"
)

type topupHandler struct {
	domain.TopUpUseCase
}

func NewTopupHandler(app *fiber.App, tu domain.TopUpUseCase) {
	handler := &topupHandler{tu}
	
	g := app.Group("/api/v1")
	g.Post("/topup", component.TokenMiddleware(handler.InitializeTopUp))
	g.Get("/check-by-order-id", handler.CheckDataTopUP)
}

func (h *topupHandler) InitializeTopUp(c *fiber.Ctx) error {
	var req dto.TopupReq
	
	err := c.BodyParser(&req)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"code":   http.StatusBadRequest,
			"Status": http.StatusText(http.StatusBadRequest),
			"error":  err.Error(),
		})
	}
	
	var newCtx = context.Background()
	
	payload := component.GetPayloadData(c)
	
	newReq := dto.TopupReq{
		Amount:        req.Amount,
		AmountDiamond: req.AmountDiamond,
		IdUser:        payload.ID,
		Name:          payload.Name,
		Email:         payload.Email,
	}
	
	fmt.Println("NEWWWW >>>>>", newReq)
	
	res, err := h.TopUpUseCase.InitializeTopUp(newCtx, newReq)
	
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"code":   http.StatusInternalServerError,
			"Status": http.StatusText(http.StatusInternalServerError),
		})
	}
	
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"code":   http.StatusOK,
		"Status": http.StatusText(http.StatusOK),
		"data":   res,
	})
	
}

func (h *topupHandler) CheckDataTopUP(c *fiber.Ctx) error {
	var orderIDReq dto.TopupOrderIDReq
	
	err := c.BodyParser(&orderIDReq)
	
	data, err := h.FindTuByOrderID(orderIDReq.OrderId)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"code":   http.StatusInternalServerError,
			"Status": http.StatusText(http.StatusInternalServerError),
		})
	}
	
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"code":   http.StatusOK,
		"Status": http.StatusText(http.StatusOK),
		"data":   data,
	})
}
