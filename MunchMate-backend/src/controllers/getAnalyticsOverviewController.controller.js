import Order from "../models/order.model.js";
import User from "../models/user.model.js";

const getAnalyticsOverviewController = async (req, res) => {
  try {
    const allOrders = await Order.find();
    const allUsers = await User.find();
    let totalRevenue = 0;

    allOrders &&
      allOrders.map((order) => {
        totalRevenue += order.totalCost;
      });

    const responseObject = {
      totalRevenue: totalRevenue,
      subscriptions: allUsers.length,
      sales: allOrders.length,
    };

    return res.status(200).json(responseObject);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

export default getAnalyticsOverviewController;
