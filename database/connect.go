package database

import (
	"fmt"
	"go_api/config"
	"go_api/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// ConnectDB connect to db
func ConnectDB() {
	var err error
	if err != nil {
		fmt.Println(err)
	}
	url := config.Config("DB_URL")
	DB, err = gorm.Open(postgres.Open(url), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	fmt.Println("Connection Opened to Database")
	DB.AutoMigrate(&model.User{}, &model.Task{})
	fmt.Println("Database Migrated")
}
