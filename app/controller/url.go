package controller

import (
	"math/rand"
	"net/http"
	"strings"

	"github.com/danieldevpy/encurtador-golang/app/database"
	"github.com/danieldevpy/encurtador-golang/app/models"
	"github.com/gin-gonic/gin"
)

func Redirect(c *gin.Context) {
	db := database.GetDatabase()
	request := c.Request.URL.Path[1:]

	var url models.Url
	err := db.Where("Key = ?", request).First(&url).Error
	if err != nil {
		c.Redirect(http.StatusFound, "/")
	}
	c.Redirect(http.StatusFound, url.Redirect)
	url.Clicks = url.Clicks + 1
	db.Save(&url)
}

func Create(c *gin.Context) {
	db := database.GetDatabase()
	var url models.Url
	err := c.ShouldBindJSON(&url)

	if err != nil {
		c.JSON(400, gin.H{
			"error": "cannot bind Json" + err.Error(),
		})
		return
	}
	if url.Redirect == "" {
		c.JSON(400, "Insira uma url")
		return
	}

	err = db.Where("Redirect = ?", url.Redirect).First(&url).Error
	if err == nil {
		url.SecretKey = "***"
		c.JSON(202, url)
		return
	}

	err = db.Where("Key = ?", url.Key).First(&url).Error
	if err == nil {
		c.JSON(400, "Esse apelido já existe! Tente outro.")
		return
	}
	if url.Key == "" {
		url.Key = RandomString(4)
	}

	url.SecretKey = url.Key + "_" + RandomString(3)

	err = db.Create(&url).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "cannot create url" + err.Error(),
		})
		return
	}

	c.JSON(200, url)
}

func RandomString(n int) string {
	var alphabet []rune = []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")

	alphabetSize := len(alphabet)
	var sb strings.Builder

	for i := 0; i < n; i++ {
		ch := alphabet[rand.Intn(alphabetSize)]
		sb.WriteRune(ch)
	}

	s := sb.String()
	return s
}
