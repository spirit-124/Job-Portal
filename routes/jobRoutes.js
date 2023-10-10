import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createJobController,
  getAllJobsController,
  updateJobController,
  getJobStatsController,
  deleteJobController,
} from "../controllers/jobController.js";
const router = express.Router();

// CREATE JOB || POST
router.post("/create-job", authMiddleware, createJobController);

// GET JOBS || GET
router.get("/get-jobs", authMiddleware, getAllJobsController);

// Update Jobs || PATCH
router.patch("/update-job/:id", authMiddleware, updateJobController);
// DELETE Jobs || DELETE
router.delete("/delete-job/:id", authMiddleware, deleteJobController);
// Get Jobs STATS || GET
router.get("/job-stats", authMiddleware, getJobStatsController);

export default router;
