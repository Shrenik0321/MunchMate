import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import getRestaurantsController from "../controllers/getRestaurantsController.controller.js";
import addRestaurantController from "../controllers/addRestaurantController.controller.js";
import updateRestaurantController from "../controllers/updateRestaurantController.controller.js";
import fileUploadMiddleware from "../middlewares/fileUpload.middleware.js";
import getRestaurantWithRestaurantItemsController from "../controllers/getRestaurantWithRestaurantItemsController.controller.js";

const restaurantRouter = express.Router();

restaurantRouter.post("/get-restaurants", getRestaurantsController);

restaurantRouter.post(
  "/get-restaurant-with-restaurant-items",
  getRestaurantWithRestaurantItemsController
);

restaurantRouter.post(
  "/add-restaurant",
  requireAuth,
  fileUploadMiddleware,
  addRestaurantController
);

restaurantRouter.post(
  "/update-restaurant",
  requireAuth,
  fileUploadMiddleware,
  updateRestaurantController
);

export default restaurantRouter;
