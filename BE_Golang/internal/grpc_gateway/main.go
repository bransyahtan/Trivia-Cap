package main

import (
	"github.com/rdwansch/Trivia-Cap/internal/component"
	"log"
)

func main() {
	if err := component.GRPCServerRun(); err != nil {
		log.Fatalln(err)
	}
}
