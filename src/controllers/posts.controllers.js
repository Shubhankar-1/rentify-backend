import { Post } from "../models/posts.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
    const { place, area, price, bedrooms, bathrooms, image } = req.body;

    const post = await Post.create({
        place,
        area,
        price,
        bedrooms,
        bathrooms,
        image,
    });

    if (!post) {
        return res.status(200).json({ message: "Post not created" });
    }

    return res
        .status(201)
        .json({ data: post, message: "Post created successfully" });
});

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find();

    if (!posts) {
        return res.status(200).json({ message: "No posts found" });
    }

    return res.status(201).json({ data: posts });
});

const getPost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
        return res.status(200).json({ message: "Post not found" });
    }

    return res.status(201).json({ data: post });
});

const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { place, area, price, bedrooms, bathrooms, image } = req.body;

    const post = await Post.findByIdAndUpdate(
        id,
        {
            place,
            area,
            price,
            bedrooms,
            bathrooms,
            image,
        },
        { new: true }
    );

    if (!post) {
        return res.status(200).json({ message: "Post not updated" });
    }

    return res
        .status(201)
        .json({ data: post, message: "Post updated successfully" });
});

const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
        return res.status(200).json({ message: "Post not deleted" });
    }

    return res
        .status(201)
        .json({ data: post, message: "Post deleted successfully" });
});

export { createPost, getAllPosts, getPost, updatePost, deletePost };
