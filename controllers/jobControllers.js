import { StatusCodes } from "http-status-codes"



export const getAllJobs = async (req, res) => {

  res.status(StatusCodes.OK).json({msg: "all jobs"})
}

export const createJob = async (req, res) => {

 res.status(StatusCodes.CREATED).json({msg: "job created"})
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


