package main

import (
	"fmt"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	configENV "github.com/rdwansch/Trivia-Cap/internal/config"
	"github.com/rdwansch/Trivia-Cap/internal/pb/quiz"
	"github.com/rdwansch/Trivia-Cap/resources/quizes/dilevery/grpc/qz_service"
	"github.com/rdwansch/Trivia-Cap/resources/quizes/repository"
	"google.golang.org/grpc"
	"log"
	"net"
)

func main() {
	//client redis
	cnf := configENV.Get()
	client := component.GetRedisConnection()
	
	quizzesRepository := repository.NewQuizzesRepository(client, cnf)
	quizeService := qz_service.NewQuizzesService(quizzesRepository)
	
	//http listen
	netListen, err := net.Listen("tcp", ":8001")
	if err != nil {
		log.Fatalln(err)
	}
	
	//grpc server
	grpcServer := grpc.NewServer()
	
	//implementation grpc
	quiz.RegisterQuizzesServiceServer(grpcServer, quizeService)
	
	fmt.Println("start grpc server running on port localhost:8001")
	
	if err := grpcServer.Serve(netListen); err != nil {
		log.Fatalln(err)
	}
	
	//
}
