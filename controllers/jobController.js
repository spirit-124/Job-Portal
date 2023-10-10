import mongoose from "mongoose";
import jobModel from "../models/jobsModel.js";
import User from "../models/userModel.js";
import moment from "moment";

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
  const { status, workType, search, sort } = req.query;
  // CONDITION FOR SEARCHING FILTERS
  const queryObject = {
    createdBy: req.user.userId,
  };
  //   LOGIC FILTER
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  let queryResult = await jobModel.find(queryObject);

  // SORTING
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "A-Z") {
    queryResult = queryResult.sort("-position");
  }

  // PAGINATION
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);

  // JOBS COUNT
  const totalJobs = await jobModel.countDocuments(queryResult);
  const numOfPage = Math.ceil(totalJobs / limit);
  const jobs = await queryResult;
  //   const jobs = await jobModel.find({ createdBy: req.user.userId });
  res.status(200).send({ totalJobs, jobs, numOfPage });
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

// =====================Delete Job======================

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const job = await jobModel.findOne({ _id: id });
    if (!job) {
      next(`No job found with id ${id}`);
    }
    if (!req.user.userId === job.createdBy.toString()) {
      next("Your not Authorized to delete this job");
      return;
    }
    await job.remove();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

// ==================GET JOBS STATs=================

export const getJobStatsController = async (req, res, next) => {
  try {
    const stats = await jobModel.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const defaultStats = {
      pending: stats.pending || 0,
      reject: stats.reject || 0,
      interview: stats.interview || 0,
    };

    // monthly yearly stats;

    const monthlyApplication = await mongoose.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    monthlyApplication = monthlyApplication
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;
        const date = moment()
          .month(month - 1)
          .year(year)
          .format("MM Y");
        return { date, count };
      })
      .reverse();
    res
      .status(200)
      .json({ totalJobs: stats.length, defaultStats, monthlyApplication });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
