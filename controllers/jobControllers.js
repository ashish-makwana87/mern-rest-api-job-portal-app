import { StatusCodes } from "http-status-codes"
import Job from "../models/JobModel.js";

export const getAllJobs = async (req, res) => {
  const allJobs = await Job.find({})

  res.status(StatusCodes.OK).json({totalJobs: allJobs.length, allJobs})
};

export const createJob = async (req, res) => {
 const job = await Job.create(req.body);
 res.status(StatusCodes.CREATED).json({job});
};

export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  if(!job) {
    res.status(StatusCodes.NOT_FOUND).json({msg: `No job existed with Id: ${id}`})
  }

 res.status(StatusCodes.OK).json({job})
};


export const updateJob = async (req, res) => {

 res.status(StatusCodes.OK).json({msg: "update job"})
};

export const deleteJob = async (req, res) => {

 res.status(StatusCodes.OK).json({msg: "delete job"})
};


