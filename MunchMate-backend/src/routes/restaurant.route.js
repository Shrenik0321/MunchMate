import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import getRestaurantsController from "../controllers/getRestaurantsController.controller.js";
import addRestaurantController from "../controllers/addRestaurantController.controller.js";
import updateRestaurantController from "../controllers/updateRestaurantController.controller.js";

const restaurantRouter = express.Router();

restaurantRouter.post(
  "/get-restaurants",
  requireAuth,
  getRestaurantsController
);

restaurantRouter.post("/add-restaurant", requireAuth, addRestaurantController);

restaurantRouter.post(
  "/update-restaurant",
  requireAuth,
  updateRestaurantController
);

export default restaurantRouter;
