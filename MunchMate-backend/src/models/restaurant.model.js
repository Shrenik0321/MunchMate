import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required."],
    },
    address: {
      type: String,
      required: [true, "Restaurant address is required."],
    },
    contactNumber: {
      type: String,
      unique: true,
      required: [true, "Restaurant contact number is required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Restaurant email address is required."],
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurants", restaurantSchema);

export default Restaurant;
