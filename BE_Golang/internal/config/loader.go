package config

import (
	"fmt"
	"github.com/spf13/viper"
)

func Get() *Config {
	viper.SetConfigFile(".env")
	if err := viper.ReadInConfig(); err != nil {
		panic(fmt.Errorf("error reading config file: %s", err))
	}
	
	return &Config{
		Server: Server{
			Host: viper.GetString("SERVER_HOST"),
			Port: viper.GetString("SERVER_PORT"),
		},
		Database: Database{
			Host:     viper.GetString("DATABASE_HOST"),
			Port:     viper.GetString("DATABASE_PORT"),
			User:     viper.GetString("DATABASE_USER"),
			Password: viper.GetString("DATABASE_PASSWORD"),
			Name:     viper.GetString("DATABASE_NAME"),
		},
		SecretKey: SecretKey{
			SecretKey: viper.GetString("SECRET_KEY"),
		},
		Midtrans: Midtrans{
			Key:    viper.GetString("MIDTRANS_KEY"),
			IsProd: viper.GetString("MIDTRANS_IS_PROD") == "production",
		},
		URLLARAVEL: URLLARAVEL{
			URL: viper.GetString("URL_LARAVEL"),
		},
	}
}
