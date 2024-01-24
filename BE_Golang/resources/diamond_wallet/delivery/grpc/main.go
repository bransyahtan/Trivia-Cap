package main

import (
	"fmt"
	"github.com/rdwansch/Trivia-Cap/internal/component"
	configENV "github.com/rdwansch/Trivia-Cap/internal/config"
	"github.com/rdwansch/Trivia-Cap/internal/pb/diamond_wallet"
	"github.com/rdwansch/Trivia-Cap/resources/diamond_wallet/delivery/grpc/dm_service"
	"github.com/rdwansch/Trivia-Cap/resources/diamond_wallet/repository"
	"google.golang.org/grpc"
	"log"
	"net"
)

func main() {
	cnf := configENV.Get()
	db := component.GetDataBaseConnection(cnf)
	
	diamondWalletRepository := repository.NewDiamondWalletRepository(db)
	diamondService := dm_service.NewDiamondWalletService(diamondWalletRepository)
	
	netListen, err := net.Listen("tcp", ":8002")
	if err != nil {
		log.Fatalln(err)
	}
	
	//grpc server
	grpcServer := grpc.NewServer()
	
	diamond_wallet.RegisterDiamondWalletServiceServer(grpcServer, diamondService)
	
	fmt.Println("start grpc server running on port localhost:8002")
	
	if err := grpcServer.Serve(netListen); err != nil {
		log.Fatalln(err)
	}
	
}
