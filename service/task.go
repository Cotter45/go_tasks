package service 

import (
	"go_api/database"
	"go_api/model"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// GetAllTasks query all tasks by userID
func GetAllTasks(c *fiber.Ctx) error {
	userID := c.Params("userID")

	db := database.DB
	var tasks []model.Task

	db.Where("user_id = ?", userID).Find(&tasks)

	return c.JSON(fiber.Map{"status": "success", "message": "All tasks", "data": tasks})
}

// GetTask query task
func GetTask(c *fiber.Ctx) error {
	userID := c.Params("userID")
	taskID := c.Params("taskID")

	db := database.DB
	var task model.Task

	db.Where("user_id = ? AND id = ?", userID, taskID).Find(&task)

	if task.Title == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No task found with ID", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Task found", "data": task})
}

// CreateTask new task
func CreateTask(c *fiber.Ctx) error {
	userID := c.Params("userID")
	userIDInt, _ := strconv.Atoi(userID)

	db := database.DB
	task := new(model.Task)

	if err := c.BodyParser(task); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't create task", "data": err})
	}

	task.UserID = userIDInt

	db.Create(&task)

	return c.JSON(fiber.Map{"status": "success", "message": "Created task", "data": task})
}

// UpdateTask update task
func UpdateTask(c *fiber.Ctx) error {
	userID := c.Params("userID")
	taskID := c.Params("taskID")

	db := database.DB
	var task model.Task

	db.Where("user_id = ? AND id = ?", userID, taskID).Find(&task)

	if task.Title == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No task found with ID", "data": nil})
	}

	if err := c.BodyParser(task); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't update task", "data": err})
	}

	db.Save(&task)

	return c.JSON(fiber.Map{"status": "success", "message": "Task successfully updated", "data": task})
}

// DeleteTask delete task
func DeleteTask(c *fiber.Ctx) error {
	userID := c.Params("userID")
	taskID := c.Params("taskID")

	db := database.DB
	var task model.Task

	db.Where("user_id = ? AND id = ?", userID, taskID).Find(&task)

	if task.Title == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No task found with ID", "data": nil})
	}

	db.Delete(&task)
	
	return c.JSON(fiber.Map{"status": "success", "message": "Task successfully deleted", "data": nil})
}