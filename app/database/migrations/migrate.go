package migrations

import (
	"github.com/danieldevpy/encurtador-golang/app/models"
	"gorm.io/gorm"
)

func RunMigrations(db *gorm.DB) {
	db.AutoMigrate(models.Url{})
}
