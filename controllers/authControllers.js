import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";


export const registerUser = async (req, res) => {

 const userCount = await User.countDocuments();

 if (userCount === 0) {
  req.body.role = 'admin'
 } else {
  req.body.role = 'user'
 }

 const hashedPassword = await hashPassword(req.body.password);
 req.body.password = hashedPassword;

 const user = await User.create(req.body);

 res.status(StatusCodes.CREATED).json({ msg: "User created" });
};

export const loginUser = async (req, res) => {

 const { email, password } = req.body;

 const user = await User.findOne({ email })
 
 if(!user) {
  throw new UnauthenticatedError('This email is not registered with us')
 }
 
 const validPassword = await comparePassword(password, user.password);

 if(!validPassword) {
  throw new UnauthenticatedError('Wrong password')
 }

 res.status(StatusCodes.OK).json({ msg: 'success' });
};

