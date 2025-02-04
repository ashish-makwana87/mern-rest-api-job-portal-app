import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import Job from "../models/jobsModel.js";

export const getAllJobs = async (req, res) => {
  const { userId } = req.user;
  const { search, jobStatus, jobType, sort, page } = req.query;

  const queryObj = { createdBy: userId };

  if (search) {
    queryObj.$or = [
      { company: { $regex: search, $options: "i" } },
      { position: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObj.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObj.jobType = jobType;
  }

  const sortObj = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const pageNumber = Number(req.query.page) || 1;
  const jobLimit = Number(req.query.limit) || 8;
  const skipJobs = (pageNumber - 1) * jobLimit;

  const allJobs = await Job.find(queryObj)
    .sort(sortObj[sort])
    .skip(skipJobs)
    .limit(jobLimit);

  const totalJobs = await Job.countDocuments(queryObj);

  const totalPages = Math.ceil(totalJobs / jobLimit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, totalPages, currentPage: pageNumber, allJobs });
};

export const createJob = async (req, res) => {
  const { userId } = req.user;
  req.body.createdBy = userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  res.status(StatusCodes.OK).json({ msg: "job updated", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const deletedJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: "job deleted" });
};

export const getJobStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: status, count } = curr;

    acc[status] = count;
    return acc;
  }, {});

  console.log(stats);

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
