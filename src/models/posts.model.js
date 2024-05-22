import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
    {
        place: {
            type: String,
            required: true,
        },
        area: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);