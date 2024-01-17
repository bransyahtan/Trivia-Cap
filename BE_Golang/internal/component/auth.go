package component

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/rdwansch/Trivia-Cap/domain"
	"github.com/rdwansch/Trivia-Cap/dto"
	"github.com/rdwansch/Trivia-Cap/internal/config"
	"net/http"
	"strings"
	"time"
)

type JWTClaims struct {
	ID     int64  `json:"id"`
	Email  string `json:"email"`
	Name   string `json:"name"`
	Avatar string `json:"avatar"`
	jwt.RegisteredClaims
}

func GenerateToken(userData domain.User) string {
	cnf := config.Get()
	
	currentTime := time.Now()
	
	expiryTime := currentTime.AddDate(0, 1, 0)
	
	claims := &JWTClaims{
		ID:     userData.Id,
		Email:  userData.Email,
		Name:   userData.Name,
		Avatar: userData.Avatar,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiryTime),
		},
	}
	
	tokenClaim := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	
	t, err := tokenClaim.SignedString([]byte(cnf.SecretKey.SecretKey))
	if err != nil {
		panic(err)
	}
	
	return t
}

func TokenMiddleware(next fiber.Handler) fiber.Handler {
	cnf := config.Get()
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(http.StatusUnauthorized).SendString("Need Token")
		}
		
		var tokenString string
		
		if strings.HasPrefix(authHeader, "Bearer ") {
			tokenString = authHeader[7:] // Mengambil bagian setelah "Bearer "
		} else {
			tokenString = authHeader // Menggunakan token langsung jika tidak menggunakan skema "Bearer"
		}
		
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(cnf.SecretKey.SecretKey), nil
		})
		
		if err != nil || !token.Valid {
			return c.Status(http.StatusUnauthorized).SendString("Invalid Token")
		}
		
		var userPayload = dto.UserPayload{
			ID:     int64(token.Claims.(jwt.MapClaims)["id"].(float64)),
			Email:  token.Claims.(jwt.MapClaims)["email"].(string),
			Name:   token.Claims.(jwt.MapClaims)["name"].(string),
			Avatar: token.Claims.(jwt.MapClaims)["avatar"].(string),
		}
		if token.Valid {
			c.Locals("user", userPayload)
		}
		
		return next(c)
	}
}

func GetPayloadData(ctx *fiber.Ctx) dto.UserPayload {
	payload := ctx.Locals("user")
	if payload != nil {
		payload, ok := payload.(dto.UserPayload)
		if !ok {
			// Handling jika gagal melakukan type assertion
			return dto.UserPayload{}
		} else {
			// Jika type assertion berhasil, Anda dapat mengakses properti ID
			return payload
		}
	}
	return dto.UserPayload{}
}
