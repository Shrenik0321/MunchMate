import RestaurantItem from "../models/restaurantItem.model.js";
import { ImageUploadFunc } from "../utils/firebaseImageHandle.js";

const addRestaurantItemController = async (req, res) => {
  try {
    let imageUrl;
    if (req.files && req.files["imageFileData"]) {
      const imageFileData = req.files["imageFileData"];
      imageUrl = await ImageUploadFunc(imageFileData, "restaurant_items");
    }

    const { restaurantId, name, ingredients, description, price } = req.body;

    // Check if name already exists for the given restaurantId
    const existingRestaurantItem = await RestaurantItem.findOne({
      restaurantId,
      name,
    });

    if (existingRestaurantItem) {
      return res.status(400).json({
        message:
          "Restaurant item with the same name already exists for this restaurant.",
      });
    }

    const restaurantItemToBeAdded = {
      restaurantId,
      name,
      ingredients,
      description,
      price,
      imageUrl,
    };

    const restaurantItem = new RestaurantItem(restaurantItemToBeAdded);

    const newRestaurantItem = await restaurantItem.save();
    res.status(201).json({
      message: "Restaurant Item added successfully.",
      data: newRestaurantItem,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

export default addRestaurantItemController;
