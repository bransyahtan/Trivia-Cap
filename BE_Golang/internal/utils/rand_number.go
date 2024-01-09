package utils

import (
	"fmt"
	"golang.org/x/exp/rand"
	"strconv"
	"time"
)

type RandNumberService interface {
	GenerateNumber() int64
	GenerateAccountNumber() string
}

type randNumber struct {
}

func NewRandNumber() *randNumber {
	return &randNumber{}
}

func (r *randNumber) GenerateNumber() int64 {
	rand.Seed(uint64(time.Now().UnixMicro()))
	
	resInt := 0
	
	const digit = 13
	randomNumber := make([]int, digit)
	for i := 1; i < digit; i++ {
		randomNumber[i] = rand.Intn(10)
	}
	
	for _, num := range randomNumber {
		resInt = resInt*10 + num
	}
	
	randFix := fmt.Sprintf("08%d", resInt)
	numInt64, _ := strconv.ParseInt(randFix, 10, 64)
	
	return numInt64
}

func (r *randNumber) GenerateAccountNumber() string {
	rand.Seed(uint64(time.Now().UnixMicro()))
	
	resInt := 0
	
	const digit = 15
	randomNumber := make([]int, digit)
	for i := 1; i < digit; i++ {
		randomNumber[i] = rand.Intn(10)
	}
	
	for _, num := range randomNumber {
		resInt = resInt*10 + num
	}
	
	randFix := fmt.Sprintf("%d", resInt)
	
	return randFix
}
