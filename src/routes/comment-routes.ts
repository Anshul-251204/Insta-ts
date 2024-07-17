import { Router } from "express";
import middlewares from "../middlewares";
import controllers from "../controllers";
const router = Router();

router
    .route("/:postId")
    .post(middlewares.authMiddleware, controllers.commentControllers.addComment)
    .get(
        middlewares.authMiddleware,
        controllers.commentControllers.getAllcommentsOfPost
    );
router
    .route("/:commentId")
    .delete(
        middlewares.authMiddleware,
        controllers.commentControllers.deleteCommentByid
    );

export default router;
