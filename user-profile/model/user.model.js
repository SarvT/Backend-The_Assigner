import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      length: [2, "Name can't be lesser than 2 characters"],
    },
    email: {
      type: String,
      unique:true,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
