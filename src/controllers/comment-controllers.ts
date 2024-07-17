import { NextFunction, Request, Response } from "express";
import Http from "../constants/statusCode-and-message";
import Comment from "../models/comment-model";
import ApiError from "../utils/api-error";
import ApiResponse from "../utils/api-response";
import asyncHandler from "../utils/async-handler";
import mongoose from "mongoose";

const addComment = asyncHandler(
    async (
        req: Request<{ postId: string }, {}, { content: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const { content } = req.body;
        const { postId } = req.params;

        if (!content || !postId) {
            return next(
                new ApiError(Http.statusCode.BadRequest, "Content is requied !")
            );
        }

        await Comment.create({
            content,
            post: postId,
            commentBy: req.user?._id,
        });

        res.status(Http.statusCode.Success).json(
            new ApiResponse(null, "comment added SuccessFull")
        );
    }
);

const getAllcommentsOfPost = asyncHandler(
    async (
        req: Request<{ postId: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const { postId } = req.params;

        if (!postId) {
            return next(
                new ApiError(
                    Http.statusCode.BadRequest,
                    "Post id is required !"
                )
            );
        }
        const comments = await Comment.aggregate([
            {
                $match: {
                    post: new mongoose.Types.ObjectId(postId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "commentBy",
                    foreignField: "_id",
                    as: "avatar",// why ? avatar because it overwrite while adding fields
                },
            },
            {
                $addFields: {
                    avatar: {
                        $first: "$avatar.avatar",
                    },
                    userName: {
                        $first: "$avatar.username",
                    },
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
        ]);

        res.status(Http.statusCode.Success).json(
            new ApiResponse(comments, "All comments of Post")
        );
    }
);

const deleteCommentByid = asyncHandler(
    async (
        req: Request<{ commentId: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const { commentId } = req.params;

        if (!commentId) {
            return next(
                new ApiError(
                    Http.statusCode.BadRequest,
                    "Comment id is required"
                )
            );
        }

        const comment = await Comment.findById(commentId);

        if (comment?._id == commentId) {
            await Comment.findByIdAndDelete(commentId);
            return res
                .status(Http.statusCode.Success)
                .json(new ApiResponse(null, "Comment Delete Successfully "));
        }

        res.status(Http.statusCode.BadRequest).json(
            new ApiResponse(null, "You can't delete other comments ")
        );
    }
);

export default { addComment, getAllcommentsOfPost, deleteCommentByid };
