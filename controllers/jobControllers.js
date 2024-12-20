import { StatusCodes } from "http-status-codes"
import Job from "../models/jobModel.js";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllJobs = async (req, res) => {
  
  const {userId} = req.user;

  const allJobs = await Job.find({createdBy: userId})

  res.status(StatusCodes.OK).json({ totalJobs: allJobs.length, allJobs })
};

export const createJob = async (req, res) => {
  const {userId} = req.user;
  req.body.createdBy = userId;
  
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job })
};

export const updateJob = async (req, res) => {

  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  res.status(StatusCodes.OK).json({ msg: "job updated", job: updatedJob })
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const deletedJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: "job deleted" })
};


