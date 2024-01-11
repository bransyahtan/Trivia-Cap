package http

import (
	"encoding/json"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	microservice "github.com/rdwansch/Trivia-Cap/internal/microservice"
	"io"
	"log"
	"net/http"
	"time"
)

type articleHandler struct {
}

func NewArticleHandler(app *fiber.App) {
	handler := &articleHandler{}
	
	g := app.Group("/api/v1")
	g.Get("/article", component.TokenMiddleware(handler.GetArticle))
	g.Get("/sse", handler.Sse)
}

func (h *articleHandler) GetArticle(c *fiber.Ctx) error {
	resp, err := http.Get(microservice.BaseUrl.UrlGet)
	if err != nil {
		panic(err)
	}
	
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			panic(err)
		}
	}(resp.Body)
	
	var article []domain.Article
	
	err = json.NewDecoder(resp.Body).Decode(&article)
	if err != nil {
		log.Println("Gagal mendekode respons JSON:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Terjadi kesalahan saat memproses data",
		})
	}
	
	//var payload dto.UserPayload
	
	return c.Status(http.StatusOK).JSON(article)
	
}

func (h *articleHandler) Sse(c *fiber.Ctx) error {
	c.Set(fiber.HeaderContentType, fiber.MIMETextPlainCharsetUTF8)
	c.Set(fiber.HeaderCacheControl, "no-cache")
	c.Set(fiber.HeaderConnection, "keep-alive")
	
	// Send an initial message to the client
	if num, err := c.Writef("data: %s\n\n", "Initial message"); err != nil {
		fmt.Println(num)
		return err
	}
	
	// Simulate sending messages every 2 seconds
	ticker := time.NewTicker(2 * time.Second)
	defer ticker.Stop()
	
	for {
		select {
		case <-c.Context().Done():
			return nil
		case <-ticker.C:
			if num, err := c.Writef("data: %s\n\n", "New message"); err != nil {
				fmt.Println(num)
				return err
			}
		}
	}
}
