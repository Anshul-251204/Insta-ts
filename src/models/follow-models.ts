import exp from "constants";
import mongoose from "mongoose";

interface IFollow {
    user: mongoose.Schema.Types.ObjectId;
    follower: mongoose.Schema.Types.ObjectId;
}

const followSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Follow = mongoose.model<IFollow>("Follow", followSchema);

export default Follow;
