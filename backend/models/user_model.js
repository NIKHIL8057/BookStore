import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],
    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "userOrder",
        },
    ],

}, { timestamps: true })

export const User = mongoose.model("User", userSchema)