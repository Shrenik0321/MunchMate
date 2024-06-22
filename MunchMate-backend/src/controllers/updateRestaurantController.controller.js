import Restaurant from "../models/restaurant.model.js";

const updateRestaurantController = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;

    // Ensure the ID and data are valid
    if (!_id || !updateData) {
      return res
        .status(400)
        .json({ message: "Invalid request, Missing ID or data." });
    }

    // Find the restaurant by ID and update it with the new data
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      _id,
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
