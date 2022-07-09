package middleware

import (
	"go_api/config"
	"go_api/service"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

var jwtKey = []byte(config.Config("SECRET"))

type Claims struct {
	Email string `json:"email"`
	UserID uint `json:"user_id"`
	jwt.StandardClaims
}


type SafeUser struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

// Protected protect routes
func Protected(c *fiber.Ctx) error {
	cookie := c.Cookies("token")

	// tokenStr := cookie.Value
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(cookie, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		jwtError(c, err)
	}
	if !token.Valid {
		jwtError(c, err)
	}

	user, err := service.GetUserByEmail(claims.Email)
	if err != nil {
		jwtError(c, err)
	}

	safeUser := SafeUser{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
	}

	c.Locals("user", safeUser)
	return c.Next()
}

func jwtError(c *fiber.Ctx, err error) error {
	if err.Error() == "Missing or malformed JWT" {
		return c.Status(fiber.StatusBadRequest).
			JSON(fiber.Map{"status": "error", "message": "Missing or malformed JWT", "data": nil})
	}
	return c.Status(fiber.StatusUnauthorized).
		JSON(fiber.Map{"status": "error", "message": "Invalid or expired JWT", "data": nil})
}
