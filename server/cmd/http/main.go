package main

import (
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
	"github.com/immatheus/dish-spotter/server/config"
	_ "github.com/immatheus/dish-spotter/server/docs"
	"github.com/immatheus/dish-spotter/server/internal/restaurant"
	"github.com/immatheus/dish-spotter/server/internal/storage"
	"github.com/immatheus/dish-spotter/server/internal/todo"
	"github.com/immatheus/dish-spotter/server/pkg/shutdown"
)

// @title Dish spotter server
// @version 2.0
// @description An example template of a Golang backend API using Fiber and MongoDB
// @contact.name Ben Davis
// @license.name MIT
// @BasePath /
func main() {
	// setup exit code for graceful shutdown
	var exitCode int
	defer func() {
		os.Exit(exitCode)
	}()

	// load config
	env, err := config.LoadConfig()
	if err != nil {
		fmt.Printf("error: %v", err)
		exitCode = 1
		return
	}

	// run the server
	cleanup, err := run(env)

	// run the cleanup after the server is terminated
	defer cleanup()
	if err != nil {
		fmt.Printf("error: %v", err)
		exitCode = 1
		return
	}

	// ensure the server is shutdown gracefully & app runs
	shutdown.Gracefully()
}

func run(env config.EnvVars) (func(), error) {
	app, cleanup, err := buildServer(env)
	if err != nil {
		return nil, err
	}

	// start the server
	go func() {
		app.Listen("0.0.0.0:" + env.PORT)
	}()

	// return a function to close the server and database
	return func() {
		cleanup()
		app.Shutdown()
	}, nil
}

func buildServer(env config.EnvVars) (*fiber.App, func(), error) {
	// init the storage
	db, err := storage.BootstrapMongo(env.MONGODB_URI, env.MONGODB_NAME, 10*time.Second)
	if err != nil {
		return nil, nil, err
	}

	// create the fiber app
	app := fiber.New()

	// add middleware
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))
	app.Use(logger.New())

	// add health check
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.SendString("Healthy!")
	})

	// add test ping pong route
	app.Get("/ping", func(c *fiber.Ctx) error {
		return c.SendString("pong!")
	})

	// add docs
	app.Get("/swagger/*", swagger.HandlerDefault)

	// create the user domain
	todoStore := todo.NewTodoStorage(db)
	todoController := todo.NewTodoController(todoStore)
	todo.AddTodoRoutes(app, todoController)

	restaurantStore := restaurant.NewRestaurantStorage(db)
	restaurantController := restaurant.NewRestaurantController(restaurantStore)
	restaurant.AddRestaurantsRoutes(app, restaurantController)

	return app, func() {
		storage.CloseMongo(db)
	}, nil
}
