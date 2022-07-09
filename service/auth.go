package service

import (
	"errors"
	"go_api/config"
	"go_api/database"
	"go_api/model"
	"time"

	"gorm.io/gorm"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

// CheckPasswordHash compare password with hash
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func GetUserByEmail(e string) (*model.User, error) {
	db := database.DB
	var user model.User
	if err := db.Where(&model.User{Email: e}).Find(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

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


// Parse JWT, find user and return user
func Restore(c *fiber.Ctx) error {
	cookie := c.Cookies("token")

	// tokenStr := cookie.Value
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(cookie, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		return c.Status(200).JSON(fiber.Map{"status": "error", "message": "Invalid token", "data": nil})
	}
	if !token.Valid {
		return c.Status(401).JSON(fiber.Map{"status": "error", "message": "Invalid token", "data": nil})
	}

	user, err := GetUserByEmail(claims.Email)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"status": "error", "message": "Invalid token", "data": nil})
	}

	safeUser := SafeUser{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
	}

	return c.JSON(fiber.Map{"status": "success", "message": "User found", "data": safeUser})
}

// Login get user and password
func Login(c *fiber.Ctx) error {
	type LoginInput struct {
		Email string `json:"email"`
		Password string `json:"password"`
	}
	type UserData struct {
		ID       uint   `json:"id"`
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	var input LoginInput
	var ud UserData

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Error on login request", "data": err})
	}
	identity := input.Email
	pass := input.Password

	email, err := GetUserByEmail(identity)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Error on email", "data": err})
	}

	if email == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "User not found", "data": err})
	}

	ud = UserData{
		ID:       email.ID,
		Username: email.Username,
		Email:    email.Email,
		Password: email.Password,
	}

	if !CheckPasswordHash(pass, ud.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Invalid password", "data": nil})
	}

	expirationTime := time.Now().Add(1 * time.Hour)

	claims := &Claims{
		Email: ud.Email,
		UserID: ud.ID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Error on login request", "data": err})
	}

	c.Cookie(&fiber.Cookie{
		Expires: expirationTime,
		Path:    "/",
		Secure:  false,
		HTTPOnly: true,
		Value:  tokenString,
		Name:    "token",
	})

	safeUser := SafeUser{
		ID:       ud.ID,
		Username: ud.Username,
		Email:    ud.Email,
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Success login", "data": safeUser})
}

// Logout delete cookie
func Logout(c *fiber.Ctx) error {
	cookie := new(fiber.Cookie)
	cookie.Name = "token"
	cookie.Expires = time.Now().AddDate(0, 0, -1)
	cookie.Path = "/"
	cookie.Secure = false
	cookie.HTTPOnly = true
	c.Cookie(cookie)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Success logout", "data": nil})
}
