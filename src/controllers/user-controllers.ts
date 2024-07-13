import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/async-handler";
import ApiError from "../utils/api-error";
import User from "../models/user-model";
import { deletefile, uploadOnCloudinary } from "../utils/cloudinary";
import Http from "../constants/statusCode-and-message";
import ApiResponse from "../utils/api-response";

const changeProfile = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const avatarLocalPath = req.file?.path;

        if (!avatarLocalPath) {
            return next(
                new ApiError(
                    Http.statusCode.BadRequest,
                    Http.message.UAvatarMissing
                )
            );
        }
        if (req.user?.avatar?.url) {
            await deletefile(req.user.avatar.public_id!);
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);

        if (!avatar?.url) {
            return next(
                new ApiError(
                    Http.statusCode.BadRequest,
                    Http.message.UErrorOnUploadingAvatar
                )
            );
        }

        await User.findByIdAndUpdate(req.user?._id, {
            $set: {
                avatar: {
                    url: avatar.url,
                    public_id: avatar.public_id,
                },
            },
        });

        return res
            .status(Http.statusCode.Success)
            .json(new ApiResponse(null, Http.message.UProfileChanged));
    }
);

export default {
    changeProfile,
};
