package restaurant

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type cords struct {
	X float64 `bson:"x" json:"x"`
	Y float64 `bson:"y" json:"y"`
}

// how the restaurant is stored in the database
type restaurant struct {
	ID          primitive.ObjectID `bson:"_id" json:"id"`
	Name        string             `bson:"name" json:"name"`
	Coordinates cords              `bson:"coordinates" json:"coordinates"`
}

type RestaurantStorage struct {
	db         *mongo.Database
	collection *mongo.Collection
}

func NewRestaurantStorage(db *mongo.Database) *RestaurantStorage {
	return &RestaurantStorage{
		db:         db,
		collection: db.Collection("restaurants"),
	}
}

func (s *RestaurantStorage) createRestaurant(newRestaurant *createRestaurantRequest, ctx context.Context) (string, error) {
	result, err := s.collection.InsertOne(ctx,
		bson.M{"name": newRestaurant.Name,
			"coordinates": bson.M{
				"x": newRestaurant.Coordinates.X,
				"y": newRestaurant.Coordinates.Y,
			}})

	if err != nil {
		return "", err
	}

	// convert the object id to a string
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (s *RestaurantStorage) getAllRestaurants(ctx context.Context) ([]restaurant, error) {
	cursor, err := s.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	restaurants := make([]restaurant, 0)
	if err = cursor.All(ctx, &restaurants); err != nil {
		return nil, err
	}

	return restaurants, nil
}
