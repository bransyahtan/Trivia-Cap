package http

import (
	"bufio"
	"fmt"
	"net/http"
	"strconv"
	
	"github.com/gofiber/fiber/v2"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"github.com/rdwansch/Trivia-Cap/internal/component"
)

type diamondWalletHandler struct {
	diamondUseCase domain.DiamondWalletUseCase
}

func NewDiamondWalletHandler(app *fiber.App, dwu domain.DiamondWalletUseCase) {
	handler := &diamondWalletHandler{dwu}
	
	g := app.Group("/api/v1")
	g.Get("/detail-wallet", component.TokenMiddleware(handler.DetailWallet))
	g.Post("/create-wallet", component.TokenMiddleware(handler.CreateWallet))
	g.Put("/update-wallet", component.TokenMiddleware(handler.UpdateWallet))
	g.Post("/confirm-topUp", handler.UpdateAfterTopUP)
	g.Put("/js/update-wallet/:userid", handler.UpdateDiamond)
	g.Get("/stream-wallet", component.TokenMiddleware(handler.StreamWallet))
	g.Post("/update-notification", handler.updateNotif)
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

func (h *diamondWalletHandler) StreamWallet(c *fiber.Ctx) error {
	c.Set("Content-Type", "text/event-stream")
	payload := component.GetPayloadData(c)
	
	c.Context().SetBodyStreamWriter(func(w *bufio.Writer) {
		
		diamondCH := make(chan uint64)
		
		//defer close(diamondCH)
		
		//var ctx = context.Background()
		
		go func() {
			for {
				pyUserID := dto.PaymentNotificationSend{UserId: payload.ID}
				diamondData, _ := h.diamondUseCase.ListenDiamondWallet(&pyUserID)
				diamondCH <- diamondData.BalanceDiamond
				
			}
			
			//	ticker := time.NewTicker(time.Second)
			//	var diamond dto.WalletResponse
			//
			//labelBreak:
			//	for {
			//		select {
			//		case <-ctx.Done():
			//			break labelBreak
			//		case <-ticker.C:
			//
			//			data, err := h.diamondUseCase.ListenDiamondWallet(payload.ID)
			//			if err != nil {
			//				return
			//			}
			//
			//			diamond.BalanceDiamond = data.BalanceDiamond
			//			diamondCH <- diamond.BalanceDiamond
			//		}
			//	}
		}()
		
		for dm := range diamondCH {
			_, _ = fmt.Fprintf(w, "data: %d\n\n", dm)
			if err := w.Flush(); err != nil {
				return
			}
		}
		
		//for {
		//	select {
		//	case dm := <-diamondCH:
		//
		//	}
		//}
		
		//for diamond := range diamondCH {
		//	_, _ = fmt.Fprintf(w, "data: %d\n\n", diamond)
		//	if err := w.Flush(); err != nil {
		//		return
		//	}
		//}
		
	})
	return nil
	
	//payload := component.GetPayloadData(c)
	//
	//data, err := h.diamondUseCase.FindById(payload.ID)
	//if err != nil {
	//	return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
	//		"status": http.StatusInternalServerError,
	//		"error":  err.Error(),
	//	})
	//}
	//
	//return c.Status(http.StatusOK).JSON(fiber.Map{
	//	"status": http.StatusOK,
	//	"data":   data,
	//})
}

func (h *diamondWalletHandler) updateNotif(c *fiber.Ctx) error {
	var notifReq map[string]interface{}
	
	err := c.BodyParser(&notifReq)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	
	fmt.Println("notifReq =>", notifReq)
	
	return c.Status(http.StatusOK).JSON("ok")
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

func (h *diamondWalletHandler) UpdateWallet(c *fiber.Ctx) error {
	var walletUpdateReq dto.WalletUpdateReq
	
	err := c.BodyParser(&walletUpdateReq)
	
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"status": http.StatusBadRequest,
			"error":  err.Error(),
		})
	}
	
	payload := component.GetPayloadData(c)
	
	newData := dto.WalletUpdateReq{
		UserId:         payload.ID,
		BalanceDiamond: walletUpdateReq.BalanceDiamond,
	}
	
	data, err := h.diamondUseCase.Update(newData)
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

func (h *diamondWalletHandler) UpdateDiamond(c *fiber.Ctx) error {
	userId := c.Params("userid")
	userIdINT, err := strconv.Atoi(userId)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid user id",
			"err":     err,
		})
	}
	
	var walletUpdateReq dto.WalletUpdateReq
	
	err = c.BodyParser(&walletUpdateReq)
	
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"status": http.StatusBadRequest,
			"error":  err.Error(),
		})
	}
	
	var newData = dto.WalletUpdateReq{
		UserId:         int64(userIdINT),
		BalanceDiamond: walletUpdateReq.BalanceDiamond,
	}
	
	dataWallet, err := h.diamondUseCase.Update(newData)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"status": http.StatusInternalServerError,
			"error":  err.Error(),
		})
	}
	
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status":  http.StatusOK,
		"data":    dataWallet,
		"message": "berhasil update diamond",
	})
	
	//err := c.BodyParser(&reqBody)
	//fmt.Println("WOIIII ++++>>>>>>>>", reqBody)
	//if err != nil {
	//	fmt.Println("gak ada req bodynya kocak", err.Error())
	//}
	//
	//userId := reqBody["userid"].(string)
	//
	//dtoUserID := dto.WalletUpdateReq{UserId: userId}
	//err = h.diamondUseCase.UpdateDiamond(dtoUserID)
	//if err != nil {
	//	return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
	//		"status": http.StatusInternalServerError,
	//		"error":  err.Error(),
	//	})
	//}
	//
	//return c.Status(http.StatusOK).JSON(fiber.Map{
	//	"status":  http.StatusOK,
	//	"message": "Top Up Success",
	//})
}

func (h *diamondWalletHandler) UpdateAfterTopUP(c *fiber.Ctx) error {
	
	//payload := component.GetPayloadData(c)
	//transactionID
	var reqBody map[string]interface{}
	
	err := c.BodyParser(&reqBody)
	
	if err != nil {
		panic(err)
	}
	
	//fmt.Println("WOIIII ++++>>>>>>>>", reqBody["transaction_status"])
	
	orderId := reqBody["order_id"].(string)
	
	dtoUserID := dto.WalletUpdateReq{OrderId: orderId}
	err = h.diamondUseCase.UpdateAfterTopUp(dtoUserID)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"status": http.StatusInternalServerError,
			"error":  err.Error(),
		})
	}
	
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status":  http.StatusOK,
		"message": "Top Up Success",
	})
}
