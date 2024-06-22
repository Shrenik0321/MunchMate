import Restaurant from "../models/restaurant.model.js";

const addRestaurantController = async (req, res) => {
  try {
    const { name, address, contactNumber, email, imageUrl, description, tags } =
      req.body;

    // Check if name, email, or contactNumber already exists
    const existingRestaurant = await Restaurant.findOne({
      $or: [{ name }, { email }, { contactNumber }],
    });

    if (existingRestaurant) {
      return res.status(400).json({
        message:
          "Restaurant with the same name, email, or contact number already exists.",
      });
    }

    const restaurant = new Restaurant({
      name,
      address,
      contactNumber,
      email,
      imageUrl,
      description,
      tags,
    });

    const newRestaurant = await restaurant.save();
    res
      .status(201)
      .json({ message: "Restaurant added successfully.", data: newRestaurant });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

export default addRestaurantController;
