import mongoose, { Document, ObjectId, Schema, model } from "mongoose";

interface IChat extends Document {
    lastMsg?: string;
    users: ObjectId[];
}

const chatSchema = new Schema(
    {
        lastMsg: {
            type: String,
        },
        users: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const Chat = model<IChat>("Chat", chatSchema);
export default Chat;