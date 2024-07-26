import express from "express";
import getAnalyticsOverviewController from "../controllers/getAnalyticsOverviewController.controller.js";
import getRecentSalesController from "../controllers/getRecentSalesController.controller.js";

const analyticsRouter = express.Router();

analyticsRouter.get("/get-analytics-overview", getAnalyticsOverviewController);
analyticsRouter.get("/get-recent-sales", getRecentSalesController);

export default analyticsRouter;
