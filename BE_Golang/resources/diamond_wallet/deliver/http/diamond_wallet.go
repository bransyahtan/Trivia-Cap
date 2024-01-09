package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	"net/http"
)

type diamondWalletHandler struct {
	diamondUseCase domain.DiamondWalletUseCase
}

func NewDiamondWalletHandler(app *fiber.App, dwu domain.DiamondWalletUseCase) {
	handler := &diamondWalletHandler{dwu}
	
	g := app.Group("/api/v1")
	g.Get("/detail-wallet", component.TokenMiddleware(handler.DetailWallet))
	g.Post("/create-wallet", component.TokenMiddleware(handler.CreateWallet))
}

func (h *diamondWalletHandler) DetailWallet(c *fiber.Ctx) error {
	payload := component.GetPayloadData(c)
	
	data, err := h.diamondUseCase.FindById(payload.ID)
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

func (h *diamondWalletHandler) CreateWallet(c *fiber.Ctx) error {
	var walletReq dto.WalletReq
	err := c.BodyParser(&walletReq)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"status": http.StatusBadRequest,
			"error":  err.Error(),
		})
	}
	
	payload := component.GetPayloadData(c)
	
	newData := dto.WalletReq{
		UserId:         payload.ID,
		AccountNumber:  walletReq.AccountNumber,
		BalanceDiamond: walletReq.BalanceDiamond,
	}
	data, err := h.diamondUseCase.CreateWallet(newData)
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
