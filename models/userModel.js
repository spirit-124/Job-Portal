import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: ["true", "Name is required"],
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: ["true", "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: ["true", "Password is required"],
      minlength: [
        6,
        "Minimum length of password should be at least 6 characters",
      ],
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
