import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";
const router = Router();

router.route("/").get(controllers.postControllers.getAllPost);
router
    .route("/")
    .post(
        middlewares.upload.single("post"),
        middlewares.authMiddleware,
        controllers.postControllers.createPost
    );
router
    .route("/:id")
    .get(controllers.postControllers.getPostById)
    .delete(
        middlewares.authMiddleware,
        controllers.postControllers.deletePostById
    );

export default router;
