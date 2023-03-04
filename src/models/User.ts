import mongoose from "mongoose";

interface IUser {
  name: string;
  email: string;
  image: string;
  emailVerified?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      minLength: 1,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("users", userSchema);
