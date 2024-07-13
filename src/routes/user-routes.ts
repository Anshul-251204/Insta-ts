import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";
const router = Router();

router.use(middlewares.authMiddleware);
router
    .route("/change-avatar")
    .patch(
        middlewares.upload.single("avatar"),
        controllers.userControllers.changeProfile
    );

export default router;
