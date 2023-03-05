import mongoose, { type Types } from "mongoose";

interface IReview {
  restaurant: Types.ObjectId;
  body: string;
  images: string[];
  user: {
    id: Types.ObjectId;
    name: string;
    image: string;
  };
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },
    body: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 1000,
    },
    images: {
      type: [String],
      default: [],
      required: true,
    },
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },
      name: { type: String, required: true },
      image: { type: String, trim: true, required: true },
    },
  },
  { timestamps: true }
);

export const Review: mongoose.Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", reviewSchema);
