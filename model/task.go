package model 

import "gorm.io/gorm"

type Task struct {
	gorm.Model
	Title       string `gorm:"not null" json:"title"`
	Description string `gorm:"not null" json:"description"`
	Completed  bool   `gorm:"not null" json:"completed"`
	UserID      int   `gorm:"not null" json:"user_id"`

	User User `gorm:"foreignkey:UserID" json:"user"`
}