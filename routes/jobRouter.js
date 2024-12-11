import express from "express";
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../controllers/jobControllers.js";
import { validateIdParams, validateJobInputs } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.route('/').get(getAllJobs).post(validateJobInputs, createJob);
router.route('/:id').get(validateIdParams, getJob).patch(validateIdParams, updateJob).delete(validateIdParams, deleteJob);

export default router;