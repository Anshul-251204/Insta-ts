import express, { Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import middlewares from "./middlewares";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
    // TODO : set origin
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(cookieParser());

app.get("/", (_, res: Response) => {
    res.status(200).json({ message: "working fine 🍌⏳" });
});

import Router from "./routes";

app.use("/api/v1/auth", Router.authRouter);
app.use("/api/v1/users", Router.userRouter);
app.use("/api/v1/posts", Router.postRouter);
app.use("/api/v1/follows", Router.followRouter);
app.use("/api/v1/comments", Router.commentRouter);

app.use(middlewares.errorHandler);
export default app;
