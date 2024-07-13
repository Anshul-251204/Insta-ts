import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/async-handler";
import ApiResponse from "../utils/api-response";
import ApiError from "../utils/api-error";
import {
    ChangePasswordBody,
    SignInBody,
    SignUPBody,
} from "./types/request-response-types";
import User from "../models/user-model";
import {
    accessCookieOptions,
    refreshCookieOptions,
} from "../constants/constants";
import Zod from "../zodSchema/request-body";
import Http from "../constants/statusCode-and-message";

const signUp = asyncHandler(
    async (
        req: Request<{}, {}, SignUPBody>,
        res: Response,
        next: NextFunction
    ) => {
        const userDetails = Zod.signUp.safeParse(req.body);

        if (!userDetails.success) {
            return next(
                new ApiError(
                    Http.statusCode.invalidformat,
                    userDetails.error.issues[0].message
                )
            );
        }
        const existingUser = await User.findOne({
            $or: [
                { username: userDetails.data.username },
                { email: userDetails.data.email },
            ],
        });

        if (existingUser) {
            return next(
                new ApiError(
                    Http.statusCode.BadRequest,
                    Http.message.UAlreadyExits
                )
            );
        }

        const user = await User.create(userDetails.data);

        res.status(Http.statusCode.Success).json(
            new ApiResponse(user, Http.message.URegister)
        );
    }
);

const signin = asyncHandler(
    async (
        req: Request<{}, {}, SignInBody>,
        res: Response,
        next: NextFunction
    ) => {
        const userDetails = Zod.signIn.safeParse(req.body);

        if (!userDetails.success) {
            return next(
                new ApiError(
                    Http.statusCode.BadRequest,
                    userDetails.error.issues[0].message
                )
            );
        }

        const user = await User.findOne({
            $or: [
                { username: userDetails.data.username },
                { email: userDetails.data.email },
            ],
        });

        if (!user) {
            return next(
                new ApiError(Http.statusCode.NotFound, Http.message.UNotExits)
            );
        }

        const isPasswordMatch = await user.passwordIsMatch(
            userDetails.data.password
        );

        if (!isPasswordMatch) {
            return next(
                new ApiError(
                    Http.statusCode.BadRequest,
                    Http.message.UWrongCred
                )
            );
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        await user.save();

        user.password = "";

        res.status(Http.statusCode.Success)
            .cookie("accessToken", accessToken, accessCookieOptions)
            .cookie("refreshToken", refreshToken, refreshCookieOptions)
            .json(new ApiResponse(user, Http.message.USigned));
    }
);

const signout = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.user?._id;
        await User.findByIdAndUpdate(
            id,
            {
                $unset: {
                    refreshToken: 1, // this removes the field from document
                },
            },
            {
                new: true,
            }
        );

        return res
            .status(200)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json(new ApiResponse({}, "User logged Out"));
    }
);

const changePassword = asyncHandler(
    async (
        req: Request<{}, {}, ChangePasswordBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return next(new ApiError(400, "all fileds are required"));
        }

        const user = await User.findById(req.user?._id);

        const isMatch = await user?.passwordIsMatch(oldPassword);

        if (!isMatch) {
            return next(new ApiError(401, "Password is incorrect !"));
        }

        if (user) {
            user.password = newPassword;
            await user.save();
        }

        res.status(200).json(
            new ApiResponse({}, "your password is changed successfully.")
        );
    }
);

export default {
    signUp,
    signin,
    signout,
    changePassword,
};
