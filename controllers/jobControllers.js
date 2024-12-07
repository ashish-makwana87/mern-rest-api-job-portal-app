import { StatusCodes } from "http-status-codes"
import Job from "../models/JobModel.js";

export const getAllJobs = async (req, res) => {

  res.status(StatusCodes.OK).json({msg: "all jobs"})
}

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
 res.status(StatusCodes.CREATED).json({job})
}

export const getJob = async (req, res) => {

 res.status(StatusCodes.OK).json({msg: "single job"})
}


export const updateJob = async (req, res) => {

 res.status(StatusCodes.OK).json({msg: "update job"})
}

export const deleteJob = async (req, res) => {

 res.status(StatusCodes.OK).json({msg: "delete job"})
}


