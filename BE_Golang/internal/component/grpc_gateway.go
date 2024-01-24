package component

import (
	"context"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/rdwansch/Trivia-Cap/internal/pb/diamond_wallet"
	"github.com/rdwansch/Trivia-Cap/internal/pb/quiz"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
	"net/http"
)

func GRPCServerRun() error {
	quizPort := "localhost:8001"
	diamondWalletPort := "localhost:8002"
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()
	
	mux := runtime.NewServeMux()
	
	opts := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}
	
	err := quiz.RegisterQuizzesServiceHandlerFromEndpoint(ctx, mux, quizPort, opts)
	err = diamond_wallet.RegisterDiamondWalletServiceHandlerFromEndpoint(ctx, mux, diamondWalletPort, opts)
	if err != nil {
		log.Fatalln(err)
	}
	
	return http.ListenAndServe(":9200", mux)
}
