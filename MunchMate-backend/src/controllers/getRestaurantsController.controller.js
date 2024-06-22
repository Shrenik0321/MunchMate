import Restaurants from "../models/restaurant.model.js";

const getRestaurantsController = async (req, res) => {
  try {
    const { id, name } = req.body;

    if (id || name) {
      const query = {};
      if (id) query._id = id;
      if (name) query.name = name;

      const restaurant = await Restaurants.findOne(query);
      if (!restaurant) {
        return res.status(404).json({
          message: "Restaurant not found.",
        });
      }

      return res.status(200).json({
        data: restaurant,
      });
    } else {
      const allRestaurants = await Restaurants.find();

      return res.status(200).json({
        data: allRestaurants,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

export default getRestaurantsController;
