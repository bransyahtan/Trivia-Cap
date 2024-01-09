package http

import (
	"encoding/json"
	"github.com/gofiber/fiber/v2"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	microservice "github.com/rdwansch/Trivia-Cap/internal/microservice"
	"io"
	"log"
	"net/http"
)

type ArticleHandler struct {
}

func NewArticleHandler(app *fiber.App) {
	handler := &ArticleHandler{}
	
	g := app.Group("/api/v1")
	g.Get("/article", component.TokenMiddleware(handler.GetArticle))
}

func (h *ArticleHandler) GetArticle(c *fiber.Ctx) error {
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
