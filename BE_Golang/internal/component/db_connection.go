package component

import (
	"fmt"
	"github.com/rdwansch/Trivia-Cap/internal/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
)

func GetDataBaseConnection(cnf *config.Config) *gorm.DB {

	dsn := fmt.Sprintf("host=%s "+
		"port=%s "+
		"user=%s "+
		"password=%s "+
		"dbname=%s "+
		"sslmode=disable", cnf.Database.Host, cnf.Database.Port, cnf.Database.User, cnf.Database.Password, cnf.Database.Name)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}

	err = migrate(db)
	if err != nil {
		log.Fatalln(err)
	}

	return db
}
