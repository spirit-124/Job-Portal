import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username) {
      next("name is required");
    }
    if (!password) {
      next("password is required");
    }
    if (!email) {
      next("email is required");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new userModel(req.body);
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      const user = await newUser.save();
      const token = jwt.sign(
        {
          username: username.username,
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .send({ message: "User created", success: true, newUser, token });
    } else {
      next("User already registered");
    }
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      next("please provide all details");
    }
    const user = await userModel.findOne({ email });
    if (user) {
      const validity = bcrypt.compare(password, user.password);
      if (!validity) {
        res
          .status(401)
          .send({ message: "Invalid password", error: err.message });
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .json({ success: true, message: "Login SUccessfully", user, token });
      }
    } else {
      res.status(401).send({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Auth Failed", error: error });
  }
};
