import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/async-handler";
import ApiError from "../utils/api-error";
import jwt, { JwtPayload } from "jsonwebtoken";
import ENV from "../config/ENV";
import User from "../models/user-model";

interface JwtPayloadType extends JwtPayload {
    _id: string;
    email: string;
    username: string;
}

const authMiddleware = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { accessToken } =
            req.cookies || req.headers.authorization?.split(" ")[1];

        if (!accessToken) {
            return next(new ApiError(401, "user unauthorized !"));
        }
        try {
            const decodedToken = (await jwt.verify(
                accessToken,
                ENV.get("ACCESS_TOKEN_SECRET")
            )) as JwtPayloadType;

            const user = await User.findById(decodedToken?._id);

            if (!user) {
                return next(
                    new ApiError(
                        401,
                        "user unauthorized ! | user not found in db !"
                    )
                );
            }

            req.user = user;
        } catch (error) {
            return next(
                new ApiError(401, "Token was Expires please login again !")
            );
        }
        next();
    }
);

export default authMiddleware;
