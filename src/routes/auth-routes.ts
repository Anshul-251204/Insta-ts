import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";
const router = Router();

router.route("/signup").post(controllers.authControllers.signUp);
router.route("/signin").post(controllers.authControllers.signin);
router
    .route("/signout")
    .post(middlewares.authMiddleware, controllers.authControllers.signout);
router
    .route("/change-password")
    .patch(
        middlewares.authMiddleware,
        controllers.authControllers.changePassword
    );

export default router;
