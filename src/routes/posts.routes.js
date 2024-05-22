import { Router } from "express";

import {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
} from "../controllers/posts.controllers.js";

const router = Router();

router.route("/getAllPosts").get(getAllPosts);
router.route("/getPost/:id").get(getPost);
router.route("/createPost").post(createPost);
router.route("/updatePost/:id").put(updatePost);
router.route("/deletePost/:id").delete(deletePost);

export default router;