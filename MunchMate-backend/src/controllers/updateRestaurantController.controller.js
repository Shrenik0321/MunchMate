import Restaurant from "../models/restaurant.model.js";
import {
  ImageDeleteFunc,
  ImageUploadFunc,
} from "../utils/firebaseImageHandle.js";

const updateRestaurantController = async (req, res) => {
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
      const restaurantToBeUpdated = await Restaurant.findById(id);
      const imageFileData = req.files["imageFileData"];
      imageUrl = await ImageUploadFunc(imageFileData, "restaurants");
      await ImageDeleteFunc(restaurantToBeUpdated.imageUrl);

      updateData = { ...updateData, imageUrl: imageUrl };
    }

    // Find the restaurant by ID and update it with the new data
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Send the updated restaurant data as the response
    return res.status(200).json({
      message: "Restaurant updated successfully.",
      data: updatedRestaurant,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

export default updateRestaurantController;
