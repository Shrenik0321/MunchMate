import RestaurantItem from "../models/restaurantItem.model.js";

const getRestaurantItemController = async (req, res) => {
  try {
    const { id, name, restaurantId } = req.body;

    if (id || name || restaurantId) {
      const query = {};
      if (id) query._id = id;
      if (name) query.name = name;
      if (restaurantId) query.restaurantId = restaurantId;

      const restaurantItem = await RestaurantItem.findOne(query);
      if (!restaurantItem) {
        return res.status(404).json({
          message: "Restaurant item not found.",
        });
      }

      return res.status(200).json({
        data: restaurantItem,
      });
    } else {
      const allRestaurantItems = await RestaurantItem.find();

      return res.status(200).json({
        data: allRestaurantItems,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

export default getRestaurantItemController;
