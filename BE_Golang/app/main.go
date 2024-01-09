package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	"github.com/rdwansch/Trivia-Cap/internal/config"
	"github.com/rdwansch/Trivia-Cap/internal/utils"
	_articleHandler "github.com/rdwansch/Trivia-Cap/resources/article/delivery/http"
	_avatarHandler "github.com/rdwansch/Trivia-Cap/resources/avatars/delivery/http"
	_avatarRepository "github.com/rdwansch/Trivia-Cap/resources/avatars/repository"
	_avatarUsecase "github.com/rdwansch/Trivia-Cap/resources/avatars/usecase"
	_diamondWalletHandler "github.com/rdwansch/Trivia-Cap/resources/diamond_wallet/deliver/http"
	_diamondWalletRepository "github.com/rdwansch/Trivia-Cap/resources/diamond_wallet/repository"
	_diamondWalletUseCase "github.com/rdwansch/Trivia-Cap/resources/diamond_wallet/usecase"
	_midtransUseCase "github.com/rdwansch/Trivia-Cap/resources/midtrans/usecase"
	_quizesHandler "github.com/rdwansch/Trivia-Cap/resources/quizes/dilevery/http"
	_topupHandler "github.com/rdwansch/Trivia-Cap/resources/topup/deliver/http"
	_topupRepo "github.com/rdwansch/Trivia-Cap/resources/topup/repository"
	_topupUseCase "github.com/rdwansch/Trivia-Cap/resources/topup/usecase"
	_userHandler "github.com/rdwansch/Trivia-Cap/resources/user/deliver/http"
	_userRepo "github.com/rdwansch/Trivia-Cap/resources/user/repository"
	_userUU "github.com/rdwansch/Trivia-Cap/resources/user/usecase"
	"log"
)

func main() {
	//config / utils
	cnf := config.Get()
	db := component.GetDataBaseConnection(cnf)
	randomNumber := utils.NewRandNumber()
	client := component.GetRedisConnection()
	
	//repository
	userRepository := _userRepo.NewUserRepository(db)
	topupRepository := _topupRepo.NewTopUpRepository(db)
	diamondWalletRepository := _diamondWalletRepository.NewDiamondWalletRepository(db)
	avatarRepository := _avatarRepository.NewAvatarRepository(client, cnf)
	
	//usecase
	userUseCase := _userUU.NewUserUseCase(userRepository, diamondWalletRepository, randomNumber)
	midtransUseCase := _midtransUseCase.NewMidtransUseCase(cnf)
	topUpUseCase := _topupUseCase.NewTopUpUseCase(topupRepository, midtransUseCase, randomNumber)
	diamondWalletUseCase := _diamondWalletUseCase.NewDiamondWalletUseCase(diamondWalletRepository, randomNumber)
	avatarUseCase := _avatarUsecase.NewAvatarUseCase(avatarRepository)
	go avatarUseCase.ReDoAvatarRedis()
	//handler
	app := fiber.New()
	app.Use(cors.New())
	
	_userHandler.NewUserHandler(app, userUseCase)
	_topupHandler.NewTopupHandler(app, topUpUseCase)
	_articleHandler.NewArticleHandler(app)
	_diamondWalletHandler.NewDiamondWalletHandler(app, diamondWalletUseCase)
	_quizesHandler.NewQuizesHandler(app)
	_avatarHandler.NewAvatarHandler(app, avatarUseCase)
	
	log.Fatal(app.Listen(":8080"))
	
}
