package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	"github.com/rdwansch/Trivia-Cap/internal/config"
	_userHandler "github.com/rdwansch/Trivia-Cap/user/diliver/http"
	_userRepo "github.com/rdwansch/Trivia-Cap/user/repository"
	_userUU "github.com/rdwansch/Trivia-Cap/user/usecase"
	"log"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	
	cnf := config.Get()
	
	db := component.GetDataBaseConnection(cnf)
	
	userRepository := _userRepo.NewUserRepository(db)
	
	userUseCase := _userUU.NewUserUseCase(userRepository)
	
	_userHandler.NewUserHandler(app, userUseCase)
	
	log.Fatal(app.Listen(":8080"))
	
}
