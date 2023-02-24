package restaurant

import (
	"github.com/gofiber/fiber/v2"
)

type RestaurantController struct {
	storage *RestaurantStorage
}

func NewRestaurantController(storage *RestaurantStorage) *RestaurantController {
	return &RestaurantController{
		storage: storage,
	}
}

type createRestaurantRequest struct {
	Name string `json:"name"`
}

type createRestaurantResponse struct {
	ID string `json:"id"`
}

// @Summary Create one restaurant.
// @Description creates one restaurant.
// @Tags restaurants
// @Accept */*
// @Produce json
// @Param restaurant body createRestaurantRequest true "Restaurant to create"
// @Success 200 {object} createRestaurantResponse
// @Router /restaurants [post]
func (t *RestaurantController) create(c *fiber.Ctx) error {
	// parse the request body
	var req createRestaurantRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	// create the restaurant
	id, err := t.storage.createRestaurant(req.Name, c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create restaurant",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(createRestaurantResponse{
		ID: id,
	})
}

// @Summary Get all restaurants.
// @Description fetch every restaurant available.
// @Tags restaurants
// @Accept */*
// @Produce json
// @Success 200 {object} []restaurantDB
// @Router /restaurants [get]
func (t *RestaurantController) getAll(c *fiber.Ctx) error {
	// get all restaurants
	restaurants, err := t.storage.getAllRestaurants(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get restaurants",
		})
	}

	return c.JSON(restaurants)
}
