import User from "../models/user.model.js";

export const updateUserController = async (req, res) => {
  try {
    let { id, ...updateData } = req.body;

    // Ensure the ID and data are valid
    if (!id || !updateData) {
      return res
        .status(400)
        .json({ message: "Invalid request, Missing ID or data." });
    }

    // Find the restaurant by ID and update it with the new data
    const updatedRestaurant = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send the updated restaurant data as the response
    return res.status(200).json({
      message: "User updated successfully.",
      data: updatedRestaurant,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};
