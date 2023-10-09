import jobModel from "../models/jobsModel.js";
import User from "../models/userModel.js";

// ================CREATE JOBS================
export const createJobController = async (req, res, next) => {
  const { position, company } = req.body;
  try {
    if (!position || !company) {
      next("Please provide all fields ");
    }
    req.body.createdBy = req.user.userId;
    const job = await jobModel.create(req.body);
    res.status(201).send({ message: "Job created successfully", job });
  } catch (error) {
    console.log(error);
    next("Error creating job");
  }
};
// ====================GET ALL JOBS =============================
export const getAllJobsController = async (req, res, next) => {
  const jobs = await jobModel.find({ createdBy: req.user.userId });
  res.status(200).send({ totalJobs: jobs.length, jobs });
};

// ==============UPDATE JOBS============================
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  //validation
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  //find job
  const job = await jobModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  //   if (!req.user.userId === job.createdBy.toString()) {
  //     next("Your Not Authorized to update this job");
  //     return;
  //   }
  const updateJob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //res
  res.status(200).json({ updateJob });
};
