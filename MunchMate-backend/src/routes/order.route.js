import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import addOrderController from "../controllers/addOrderController.controller.js";
import getOrdersController from "../controllers/getOrdersController.controller.js";
import updateOrderController from "../controllers/updateOrderController.controller.js";

const orderRouter = express.Router();

orderRouter.post("/get-orders", getOrdersController);

orderRouter.post("/add-order", requireAuth, addOrderController);

orderRouter.post("/update-order", requireAuth, updateOrderController);

export default orderRouter;
