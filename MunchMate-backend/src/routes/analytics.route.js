import express from "express";
import getAnalyticsOverviewController from "../controllers/getAnalyticsOverviewController.controller.js";

const analyticsRouter = express.Router();

analyticsRouter.get("/get-total-revenue", getAnalyticsOverviewController);

export default analyticsRouter;
