import mongoose from "mongoose";
import User from "./user.model.js";
import Restaurant from "./restaurant.model.js";
import RestaurantItem from "./restaurantItem.model.js";

const orderedItemsSchema = mongoose.Schema(
  {
    restaurantItemId: {
      type: mongoose.Types.ObjectId,
      ref: RestaurantItem,
      required: [true, "Restaurant Item is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
    },
  },
  { _id: false }
);

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: [true, "User is required."],
    },
    restaurantId: {
      type: mongoose.Types.ObjectId,
      ref: Restaurant,
      required: [true, "Restaurant is required."],
    },
    orderedItems: {
      type: [orderedItemsSchema],
    },
    totalCost: {
      type: Number,
      required: [true, "Total Cost is required."],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact Number is required."],
    },
    address: {
      type: String,
      required: [true, "Address is required."],
    },
    status: {
      type: String,
      enum: ["Placed", "In Progress", "Delivered", "Rejected"],
      default: "In Progress",
      required: [true, "Status is required."],
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

const Order = mongoose.model("Order", orderSchema);

export default Order;
