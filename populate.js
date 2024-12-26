import "dotenv/config";
import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import User from "./models/userModel.js";
import Job from "./models/jobModel.js";
import {readFile} from 'fs/promises';
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const app = express();

try {
 await mongoose.connect(process.env.MONGO_URL)
 const user = await User.findOne({email: 'test@gmail.com'})
 
 const jobData = JSON.parse(
  await readFile(path.resolve(__dirname, "./utils", "mockData.json"))
);

const finalData = jobData.map((job) => {
 return { ...job, createdBy: user._id };
});

await Job.deleteMany({ createdBy: user._id });
await Job.create(finalData);

 console.log('jobs added successfully');
 process.exit(0);
} catch (error) {
 console.log(error);
 process.exit(1);
}