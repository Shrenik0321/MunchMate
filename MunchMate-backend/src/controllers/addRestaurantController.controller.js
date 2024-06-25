import Restaurant from "../models/restaurant.model.js";
import { ImageUploadFunc } from "../utils/imageUploadFunc.js";

const addRestaurantController = async (req, res) => {
  try {
    let imageUrl;
    if (req.files && req.files["imageFileData"]) {
      const imageFileData = req.files["imageFileData"];
      imageUrl = await ImageUploadFunc(imageFileData, "restaurants");
    }

    const { name, address, contactNumber, email, description, tags } = req.body;

    // Check if name, email, or contact number already exists
    const existingRestaurant = await Restaurant.findOne({
      $or: [{ name }, { email }, { contactNumber }],
    });

    if (existingRestaurant) {
      return res.status(400).json({
        message:
          "Restaurant with the same name, email, or contact number already exists.",
      });
    }

    const restaurantToBeAdded = {
      name,
      address,
      contactNumber,
      email,
      imageUrl,
      description,
      tags,
    };

    const restaurant = new Restaurant(restaurantToBeAdded);

    const newRestaurant = await restaurant.save();
    res
      .status(201)
      .json({ message: "Restaurant added successfully.", data: newRestaurant });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

export default addRestaurantController;
