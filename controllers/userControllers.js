import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";


export const getCurrentUser = async (req, res) => {

 const { userId } = req.user;
 const user = await User.findById(userId);

 const newUser = user.toJSON();

 res.status(StatusCodes.OK).json({ users: newUser })
}


export const getApplicationStats = async (req, res) => {

 const users = await User.countDocuments();
 const jobs = await Job.countDocuments()
 
 

 res.status(StatusCodes.OK).json({ users, jobs })
}

export const updateUser = async (req, res) => {
 
 const newUser = {...req.body};
 delete newUser.password

 const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

 res.status(StatusCodes.OK).json({ msg: 'user updated' })
}