import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobControllers.js";
import {
  validateIdParams,
  validateJobInputs,
} from "../middlewares/validationMiddleware.js";
import { checkTestUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllJobs)
  .post(checkTestUser, validateJobInputs, createJob);
router
  .route("/:id")
  .get(checkTestUser, validateIdParams, getJob)
  .patch(checkTestUser, validateIdParams, updateJob)
  .delete(checkTestUser, validateIdParams, deleteJob);

export default router;
