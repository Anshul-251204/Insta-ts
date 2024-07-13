import { Document, ObjectId, Schema, model } from "mongoose";

interface IRequest extends Document {
    senderId: ObjectId;
    receiverId: ObjectId;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    createdAt: Date;
    updatedAt: Date;
}

const requestSchema = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ["PENDING", "ACCEPTED", "REJECTED"],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

const Request = model<IRequest>("Request", requestSchema);

export default Request;
