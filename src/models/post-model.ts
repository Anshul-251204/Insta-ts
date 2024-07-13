import mongoose, { Schema, Document, model, ObjectId } from "mongoose";

interface IPost extends Document {
    caption?: string;
    image?: {
        url: string;
        public_id: string;
    };
    owner: ObjectId;
}

const postSchema = new Schema(
    {
        caption: {
            type: String,
        },
        post: {
            url: String,
            public_id: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    },
    { timestamps: true }
);

const Post = model<IPost>("Post", postSchema);

export default Post;
