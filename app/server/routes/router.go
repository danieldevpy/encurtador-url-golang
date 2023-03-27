package routes

import (
	"net/http"

	"github.com/danieldevpy/encurtador-golang/app/controller"
	"github.com/gin-gonic/gin"
)

func ConfigRoutes(router *gin.Engine) *gin.Engine {
	router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.tmpl", gin.H{
			"title": "Encurtador de URL",
		})
	})
	router.GET("/:url", controller.Redirect)
	router.POST("/", controller.Create)

	return router
}
