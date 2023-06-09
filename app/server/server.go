package server

import (
	"fmt"
	"log"
	"net/http"

	"github.com/danieldevpy/encurtador-golang/app/server/routes"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

type Server struct {
	port   string
	router *gin.Engine
}

func NewServer() Server {
	return Server{
		port:   "8090",
		router: gin.Default(),
	}
}

func (server *Server) Run() {
	store := cookie.NewStore([]byte("secret"))
	server.router.Use(sessions.Sessions("mysession", store))
	server.router.LoadHTMLGlob("templates/html/**")
	server.router.StaticFS("/assets", http.Dir("templates/assets"))
	router := routes.ConfigRoutes(server.router)
	fmt.Println("O server está rodando na porta:", server.port)
	log.Fatal(router.Run(":" + *&server.port))
}
