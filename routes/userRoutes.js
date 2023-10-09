import express from "express";
import { updateUserController } from "../controllers/userController.js";
import authMiddleware from "../middelwares/authMiddleware.js";

//router object
const router = express.Router();

//routes
// GET USERS || GET

// UPDATE USER || PUT
router.put("/update-user", authMiddleware, updateUserController);

export default router;
