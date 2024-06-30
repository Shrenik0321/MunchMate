import mongoose from "mongoose";

const restaurantItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: String,
      required: [true, "Restaurant ID is required."],
    },
    name: {
      type: String,
      required: [true, "Item name is required."],
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required."],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    imageUrl: {
      type: String,
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

const RestaurantItem = mongoose.model("restaurant_items", restaurantItemSchema);

export default RestaurantItem;
