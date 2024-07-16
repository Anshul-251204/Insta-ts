import controllers from "../controllers";
import { Router } from "express";
import middlewares from "../middlewares";

const router = Router();

router
    .route("/:id")
    .post(middlewares.authMiddleware, controllers.followControllers.follow);

export default router;
