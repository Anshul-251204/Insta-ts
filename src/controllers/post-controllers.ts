import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/async-handler";
import ApiError from "../utils/api-error";
import Http from "../constants/statusCode-and-message";
import { uploadOnCloudinary } from "../utils/cloudinary";
import Post from "../models/post-model";
import ApiResponse from "../utils/api-response";
import mongoose, { Mongoose } from "mongoose";

const createPost = asyncHandler(
    async (
        req: Request<{}, {}, { caption: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const { caption } = req.body;
        const postUrl = req.file?.path;

        console.log(caption, postUrl);

        if (postUrl) {
            const post = await uploadOnCloudinary(postUrl!);

            if (!post) {
                return next(
                    new ApiError(
                        Http.statusCode.ServerError,
                        Http.message.pUploadError
                    )
                );
            }

            await Post.create({
                post: {
                    url: post?.url,
                    public_id: post?.public_id,
                },
                caption,
                owner: req.user?._id,
            });

            return res
                .status(Http.statusCode.Success)
                .json(new ApiResponse(null, Http.message.pUploadSuccess));
        }

        return next(
            new ApiError(Http.statusCode.BadRequest, Http.message.pIsRequired)
        );
    }
);

const getPostById = asyncHandler(
    async (
        req: Request<{ id: string }, {}>,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;

        if (!id) {
            return next(new ApiError(400, "Invalid url or Id required !"));
        }
        const posts = await Post.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "avatar",
                },
            },
            {
                $addFields: {
                    avatar: {
                        $first: "$avatar.avatar",
                    },
                    username: {
                        $first: "$avatar.username",
                    },
                },
            },
        ]);

        if (posts.length === 0) {
            return res
                .status(Http.statusCode.Success)
                .json(new ApiResponse(null, "Post Not Found !"));
        }

        res.status(Http.statusCode.Success).json(
            new ApiResponse(posts[0], "All posts")
        );
    }
);

const getAllPost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const posts = await Post.aggregate([
            {
                $match: {},
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "avatar",
                },
            },
            {
                $addFields: {
                    avatar: {
                        $first: "$avatar.avatar",
                    },
                    username: {
                        $first: "$avatar.username",
                    },
                },
            },
        ]);

        res.status(Http.statusCode.Success).json(
            new ApiResponse(posts, "All posts")
        );
    }
);

const deletePostById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        if (!id) {
            return next(
                new ApiError(Http.statusCode.BadRequest, "Id is Required !")
            );
        }

        const post = await Post.findById(id);

        if (!post) {
            return next(
                new ApiError(Http.statusCode.BadRequest, "Invalid Post id !")
            );
        }

        if (post._id == id) {
            await Post.findByIdAndDelete(id);

            return res
                .status(Http.statusCode.Success)
                .json(new ApiResponse(null, "Post deleted Successfully !"));
        }
    }
);
export default {
    createPost,
    getAllPost,
    getPostById,
    deletePostById,
};
