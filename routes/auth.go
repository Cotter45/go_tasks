package routes

import (
	"go_api/service"

	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app *fiber.App, api fiber.Router) {
	auth := api.Group("/auth")
	auth.Get("/restore", service.Restore)
	auth.Post("/login", service.Login)
	auth.Post("/signup", service.Signup)
	auth.Delete("/logout", service.Logout)

	// return 404 for all other api routes
	auth.Get("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	auth.Post("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	auth.Put("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	auth.Patch("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	auth.Delete("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});
}