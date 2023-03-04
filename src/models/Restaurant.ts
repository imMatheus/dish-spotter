import mongoose from "mongoose";

interface IRestaurant {
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
    long: number;
    lat: number;
  };
  rating: number;
  numberOfReviews: number;
}

const restaurantSchema = new mongoose.Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 30,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      long: { type: Number, required: true },
      lat: { type: Number, required: true },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

export const Restaurant: mongoose.Model<IRestaurant> =
  mongoose.models.Restaurant ||
  mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
