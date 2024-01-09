package config

type Config struct {
	Server   Server
	Database Database
	//Cloudinary Cloudinary
	SecretKey  SecretKey
	Midtrans   Midtrans
	URLLARAVEL URLLARAVEL
}

type Server struct {
	Host string
	Port string
}

type SecretKey struct {
	SecretKey string
}

type Database struct {
	Host     string
	Port     string
	User     string
	Password string
	Name     string
}

type Cloudinary struct {
	CloudName string
	ApiKey    string
	ApiSecret string
}

type Midtrans struct {
	Key    string
	IsProd bool
}

type URLLARAVEL struct {
	URL string
}
