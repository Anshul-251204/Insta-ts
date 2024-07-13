import mongoose, { Document, ObjectId, Schema, model } from "mongoose";

interface IMessage extends Document {
    msg?: string;
    sendBy: ObjectId;
}

const messageSchema = new Schema(
    {
        msg: {
            type: String,
        },
        sendBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Message = model<IMessage>("Message", messageSchema);

export default Message;