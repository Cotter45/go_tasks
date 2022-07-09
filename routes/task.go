package routes 

import (
	"go_api/service"
	"go_api/middleware"

	"github.com/gofiber/fiber/v2"
)

func TaskRoutes(app *fiber.App, api fiber.Router) {
	task := api.Group("/task")
	task.Use("*", middleware.Protected)
	task.Get("/:id", service.GetTask)
	task.Get("/", service.GetAllTasks)
	task.Post("/", service.CreateTask)
	task.Patch("/:id", service.UpdateTask)
	task.Delete("/:id", service.DeleteTask)

	// return 404 for all other api routes
	task.Get("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	task.Post("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	task.Put("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	task.Patch("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	task.Delete("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});
}