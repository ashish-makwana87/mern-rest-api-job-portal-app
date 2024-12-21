import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";


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

 if (!user) {
  throw new UnauthenticatedError('This email is not registered with us')
 }

 const validPassword = await comparePassword(password, user.password);

 if (!validPassword) {
  throw new UnauthenticatedError('Wrong password')
 }

 const token = createJWT({ userId: user._id, role: user.role })
 const oneDay = 1000 * 60 * 60 * 24;

 res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + oneDay), secure: process.env.NODE_ENV === 'production' })

 res.status(StatusCodes.OK).json({ msg: 'success' });
};

export const logoutUser = (req, res) => {
 
 res.cookie('token', 'random', { httpOnly: true, expires: new Date(Date.now()), secure: process.env.NODE_ENV === 'production' } );
 res.status(StatusCodes.OK).json({msg: "logged out successfully"});
}