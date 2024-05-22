import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    let { firstName, lastName, phoneNumber, email, password, role } = req.body;

    //db query for existing user
    const existingUser = await User.findOne({
        email: email,
    });

    if (existingUser) {
        return res.status(200).json({ message: "User already exists" });
    }

    const user = await User.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        role,
    });

    //Now we send data of the newly created use but excluding the password and refresh token
    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
        return res.status(200).json({ message: "User not created" });
    }

    //Now we will send a proper built response using the ApiResponse class to serve a uniform response every time
    return res
        .status(201)
        .json({ data: createdUser, message: "User created successfully" });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({
        email: email,
    });

    if (!user) {
        return res.status(200).json({ message: "User not found" });
    }

    const checkPass = await user.isPasswordCorrect(password);

    if (!checkPass) {
        return res.status(200).json({ message: "Invalid credentials" });
    }

    //Getting the same user without the password and refreshToken included
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(201)
        .json({ data: loggedInUser, message: "User logged in" });
});

const getUser = async (req, res) => {
    if (!req.user) {
        return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(new ApiResponse(200, "User found", req.user));
};

const getAllUsers = async (req, res) => {
    const allUsers = await User.find().select(" -password");

    return res.status(200).json("All users fetched successfully", allUsers);
};

export { registerUser, loginUser, getUser, getAllUsers };
