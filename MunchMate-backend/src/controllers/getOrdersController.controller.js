import Order from "../models/order.model.js";

const getOrdersController = async (req, res) => {
  try {
    const { id } = req.body;
    const query = {};

    if (id) {
      query._id = id;
    }

    const orders = await Order.find(query)
      .populate({
        path: "orderedItems.restaurantItemId",
      })
      .populate("userId")
      .populate("restaurantId");

    if (!orders.length) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      data: orders,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error.",
      error: err.message,
    });
  }
};

export default getOrdersController;
