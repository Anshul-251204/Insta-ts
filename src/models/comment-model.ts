import mongoose, { Document } from "mongoose";

interface IComment extends Document {
    content: string;
    commentBy: mongoose.Schema.Types.ObjectId;
}
const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        commentBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
