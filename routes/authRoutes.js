import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", getProfile);
router.get("/update-profile", updateProfile);

export default router;
