import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import getRestaurantItemsController from "../controllers/getRestaurantItemController.controller.js";
import addRestaurantItemController from "../controllers/addRestaurantItemController.controller.js";
import updateRestaurantItemsController from "../controllers/updateRestaurantItemController.controller.js";
import fileUploadMiddleware from "../middlewares/fileUpload.middleware.js";

const restaurantItemRouter = express.Router();

restaurantItemRouter.post(
  "/get-restaurant-items",
  getRestaurantItemsController
);

restaurantItemRouter.post(
  "/add-restaurant-item",
  requireAuth,
  fileUploadMiddleware,
  addRestaurantItemController
);

restaurantItemRouter.post(
  "/update-restaurant-item",
  requireAuth,
  updateRestaurantItemsController
);

export default restaurantItemRouter;
