import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";


export const registerUser = async (req, res) => {
 
 const userCount = await User.countDocuments(); 
 
 if(userCount === 0) {
  req.body.role = 'admin'
 } else {
  req.body.role = 'user'
 }

 const user = await User.create(req.body)

 res.status(StatusCodes.CREATED).json({ user })
};

export const loginUser = async (req, res) => {

 res.status(StatusCodes.OK).json({ msg: 'login user' })
}; 

