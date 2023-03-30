package models

import "time"

type Url struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Key       string    `json:"key"`
	SecretKey string    `json:"secret_key"`
	Redirect  string    `json:"redirect"`
	Clicks    int32     `json:"clicks"`
	User      *User     `json:"user"`
	UserID    *int      `json:"user_id"`
	UpdatedAt time.Time `json:"updated"`
}
