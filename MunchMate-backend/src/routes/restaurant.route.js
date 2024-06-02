import express from "express";
import { getRestaurantsController } from "../controllers/getRestaurantsController.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const restaurantRouter = express.Router();

restaurantRouter.post(
  "/get-restaurants",
  requireAuth,
  getRestaurantsController
);

export default restaurantRouter;
