import Order from "../models/order.model.js";
import User from "../models/user.model.js";

const getRecentSalesController = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $lookup: {
          from: User.collection.name,
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error.",
      error: err.message,
    });
  }
};

export default getRecentSalesController;
