package main

import (
	"go_api/database"
	"go_api/routes"
	"go_api/config"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()

	if config.Config("ENVIRONMENT") == "development" {
		app.Use(cors.New())
		app.Use(logger.New())
	}

	database.ConnectDB()

	routes.SetupRoutes(app)
	log.Fatal(app.Listen(":8000"))
}