package restaurant

import "github.com/gofiber/fiber/v2"

func AddRestaurantsRoutes(app *fiber.App, controller *RestaurantController) {
	restaurants := app.Group("/restaurants")

	// add middlewares here

	// add routes here
	restaurants.Post("/", controller.create)
	restaurants.Get("/", controller.getAll)
}
