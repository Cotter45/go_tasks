package routes 

import (
	"go_api/service"
	"go_api/middleware"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App, api fiber.Router) {
	user := api.Group("/user")
	user.Get("/:id", service.GetUser)
	user.Post("/", service.CreateUser)
	user.Use("*", middleware.Protected)
	user.Patch("/:id", service.UpdateUser)
	user.Delete("/:id", service.DeleteUser)

	// return 404 for all other api routes
	user.Get("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	user.Post("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	user.Put("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	user.Patch("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	user.Delete("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});
}