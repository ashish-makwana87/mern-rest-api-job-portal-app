import express from "express";
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../controllers/jobControllers.js";


const router = express.Router();


router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

export default router;