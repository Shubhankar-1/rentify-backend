import { Router } from "express";

import {
    getAllUsers,
    getUser,
    loginUser,
    registerUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/check").get((req, res) => {
    res.status(200).send("OK");
});
router.route("/").get(getUser);
router.route("/getAllUsers").get(getAllUsers); //Add the AppAdmin check middleware here
router.route("/register").post(registerUser); //After registering the AppAdmin user, add the AppAdmin middleware here
router.route("/login").post(loginUser);

export default router;
