import RestaurantItem from "../models/restaurantItem.model.js";
import {
  ImageDeleteFunc,
  ImageUploadFunc,
} from "../utils/firebaseImageHandle.js";

const updateRestaurantItemController = async (req, res) => {
  try {
    let { id, ...updateData } = req.body;

    // Ensure the ID and data are valid
    if (!id || !updateData) {
      return res
        .status(400)
        .json({ message: "Invalid request, Missing ID or data." });
    }

    if (req.files && req.files["imageFileData"]) {
      let imageUrl;
      const restaurantItemToBeUpdated = await RestaurantItem.findById(id);
      const imageFileData = req.files["imageFileData"];
      imageUrl = await ImageUploadFunc(imageFileData, "restaurant_items");
      await ImageDeleteFunc(restaurantItemToBeUpdated.imageUrl);

      updateData = { ...updateData, imageUrl: imageUrl };
    }

    // Find the restaurant item by ID and update it with the new data
    const updatedRestaurantItem = await RestaurantItem.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedRestaurantItem) {
      return res.status(404).json({ message: "Restaurant item not found." });
    }

    // Send the updated restaurant item data as the response
    return res.status(200).json({
      message: "Restaurant item updated successfully.",
      data: updatedRestaurantItem,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

export default updateRestaurantItemController;
