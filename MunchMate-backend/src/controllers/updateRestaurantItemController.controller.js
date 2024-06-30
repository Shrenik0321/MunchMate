import RestaurantItem from "../models/restaurantItem.model.js";

const updateRestaurantItemController = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;

    // Ensure the ID and data are valid
    if (!_id || Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid request, missing ID or data." });
    }

    // Find the restaurant item by ID and update it with the new data
    const updatedRestaurantItem = await RestaurantItem.findByIdAndUpdate(
      _id,
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
