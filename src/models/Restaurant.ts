import mongoose from "mongoose";

interface IRestaurant {
  name: string;
  images: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  location: {
    coordinates: [number, number];
    type: "Point";
  };
  rating: number;
  numberOfReviews: number;
}

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const restaurantSchema = new mongoose.Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    images: {
      type: [String],
      required: true,
      default: [],
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    location: {
      type: pointSchema,
      required: true,
      index: "2dsphere",
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
