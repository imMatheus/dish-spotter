package restaurant

import (
	"github.com/gofiber/fiber/v2"

	"github.com/go-playground/validator/v10"
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
	Name        string `json:"name" validate:"required"`
	Coordinates cords  `bson:"coordinates" json:"coordinates" validate:"required,dive,required"`
}

type createRestaurantResponse struct {
	ID string `json:"id"`
}

func (t *RestaurantController) create(c *fiber.Ctx) error {
	// parse the request body
	var req createRestaurantRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	validate := validator.New()
	err := validate.Struct(req)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body from validator",
		})
	}

	// create the restaurant
	id, err := t.storage.createRestaurant(&req, c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create restaurant",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(createRestaurantResponse{
		ID: id,
	})
}

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
