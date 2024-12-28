import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { unlink } from "fs/promises";
import cloudinary from "cloudinary";
import Job from "../models/jobModel.js";

export const getCurrentUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);

  const newUser = user.toJSON();

  res.status(StatusCodes.OK).json({ user: newUser });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  console.log(req.file);

  let obj = { ...req.body };
  delete obj.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await unlink(req.file.path);
    obj.avatar = response.secure_url;
    obj.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
