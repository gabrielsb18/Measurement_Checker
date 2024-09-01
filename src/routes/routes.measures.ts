import express from "express";
import middleware from "../middlewares/validateParams";
import controller from "../controllers/controller.measures"

const router =express.Router();

router.post("/upload",  middleware.validateParams, controller.createMeasure);

export default router;