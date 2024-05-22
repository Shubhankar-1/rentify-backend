import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },

        role: {
            type: String,
            enum: ["seller", "buyer"], // We can add more xxAdmin and xxEmployee values
            default: "buyer",
        },

        password: {
            type: String,
            required: [true, "Password Required"], //Message for false condition
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); //Here we are using normal function because we want the pre to have the context ('this') of the user schema
    this.password = await bcrypt.hash(this.password, 10); //Do not remove the "await" here even if the editor suggests
    next();
});

//These methods below are available with per 'user' and not in the whole User model, make sure to keep this in mind when accessing these
//This method check for the password entered
userSchema.methods.isPasswordCorrect = async function (password) {
    const response = await bcrypt.compare(password, this.password);

    return response;
};

export const User = mongoose.model("User", userSchema);
