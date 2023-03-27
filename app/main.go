package main

import (
	"github.com/danieldevpy/encurtador-golang/app/database"
	"github.com/danieldevpy/encurtador-golang/app/server"
)

func main() {
	database.StartDB()
	server := server.NewServer()
	server.Run()
}
