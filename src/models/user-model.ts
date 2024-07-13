import { Schema, Document, model, ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config/ENV.js";

export interface IUser extends Document {
    _id: ObjectId;
    name: string;
    email: string;
    username: string;
    bio: string;
    phoneNo?: number | string;
    nextTrip: string;
    avatar?: {
        url?: string;
        public_id?: string;
    };
    accessToken: string;
    refreshToken: string;
    password: string;
    passwordIsMatch(password: string): boolean;
    generateRefreshToken(): string;
    generateAccessToken(): string;
}

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required !"],
        },
        username: {
            type: String,
            required: [true, "Username is required !"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: [true, "Email is required !"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            required: [true, "Password is required !"],
        },
        bio: {
            type: String,
        },
        phoneNo: {
            type: Number,
        },
        nextTrip: {
            type: String,
        },
        avatar: {
            url: String,
            public_id: String,
        },
        accessToken: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.passwordIsMatch = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    const playload = {
        _id: this._id,
        email: this.email,
        userName: this.userName,
    };

    const token = await jwt.sign(playload, ENV.get("ACCESS_TOKEN_SECRET"), {
        expiresIn: ENV.get("ACCESS_TOKEN_EXPIRY"),
    });

    return token;
};

userSchema.methods.generateRefreshToken = async function () {
    const playload = {
        _id: this._id,
    };
    const token = await jwt.sign(playload, ENV.get("REFRESH_TOKEN_SECRET"), {
        expiresIn: ENV.get("REFRESH_TOKEN_EXPIRY"),
    });

    return token;
};

const User = model<IUser>("User", userSchema);

export default User;
