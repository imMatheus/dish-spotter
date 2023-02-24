package restaurant

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// how the restaurant is stored in the database
type restaurantDB struct {
	ID   primitive.ObjectID `bson:"_id" json:"id"`
	Name string             `bson:"name" json:"name"`
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

func (s *RestaurantStorage) createRestaurant(name string, ctx context.Context) (string, error) {
	result, err := s.collection.InsertOne(ctx, bson.M{"name": name})
	if err != nil {
		return "", err
	}

	// convert the object id to a string
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (s *RestaurantStorage) getAllRestaurants(ctx context.Context) ([]restaurantDB, error) {
	cursor, err := s.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	restaurants := make([]restaurantDB, 0)
	if err = cursor.All(ctx, &restaurants); err != nil {
		return nil, err
	}

	return restaurants, nil
}
