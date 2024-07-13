import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/async-handler";
import ApiError from "../utils/api-error";
import Follow from "../models/follow-models";
import Http from "../constants/statusCode-and-message";
import ApiResponse from "../utils/api-response";

const follow = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        if (!id) {
            return next(new ApiError(400, "Id is required"));
        }

        const follow = await Follow.findOne({ follow: id });

        if (follow) {
            await Follow.findByIdAndDelete(follow._id);
            res.status(Http.statusCode.Success).json(
                new ApiResponse(null, "unfollowed")
            );
        }

        if (!follow) {
            await Follow.create({
                user: req.user?._id,
                follower: id,
            });

            res.status(Http.statusCode.Success).json(
                new ApiResponse(null, "followed")
            );
        }
    }
);

export default {follow};
