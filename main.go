package main

import (
	"go_api/database"
	"go_api/routes"
	"go_api/config"
	"log"
	"os"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	app := fiber.New()

	if config.Config("ENVIRONMENT") == "development" {
		app.Use(cors.New())
		app.Use(logger.New())
	}
	app.Use(recover.New())

	database.ConnectDB()
	routes.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Fatal(app.Listen(fmt.Sprint(":", port)))
}