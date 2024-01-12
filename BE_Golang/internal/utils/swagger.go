package utils

import "github.com/gofiber/fiber/v2"

func SwaggerHandler(app *fiber.App) {
	app.Get("/swagger/*")
}
