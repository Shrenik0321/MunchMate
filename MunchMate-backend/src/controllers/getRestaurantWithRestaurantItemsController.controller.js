import mongoose from "mongoose";
import Restaurant from "../models/restaurant.model.js";
import RestaurantItem from "../models/restaurantItem.model.js";

const getRestaurantWithRestaurantItemsController = async (req, res) => {
  try {
    const { id } = req.body;

    const objectId = mongoose.Types.ObjectId.createFromHexString(id);

    const result = await Restaurant.aggregate([
      {
        $match: { _id: objectId },
      },
      {
        $lookup: {
          from: RestaurantItem.collection.name,
          localField: "_id",
          foreignField: "restaurantId",
          as: "items",
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    return res.status(200).json(result[0]);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

export default getRestaurantWithRestaurantItemsController;
