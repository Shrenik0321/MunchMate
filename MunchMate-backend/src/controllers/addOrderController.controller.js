import Order from "../models/order.model.js";

const addOrderController = async (req, res) => {
  try {
    const orderToBeAdded = { ...req.body };
    const order = new Order(orderToBeAdded);

    const newOrder = await order.save();
    res
      .status(201)
      .json({ message: "Order added successfully.", data: newOrder });
  } catch (err) {
    return res``
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

export default addOrderController;
