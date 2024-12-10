import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';

const validationErrors = (values) => {

 return [values, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
   const errorMessages = errors.array().map((object) => object.msg);
   
   if(errorMessages[0].startsWith('No job')) {
    throw new NotFoundError(errorMessages)
   }

   throw new BadRequestError(errorMessages);
  }

  next();
 }]
};


export const validateJobInputs = validationErrors([
 body('company').notEmpty().withMessage('Company name is required'),
 body('position').notEmpty().withMessage('Position name is required'),
 body('jobLocation').notEmpty().withMessage('Location is required'),
 body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Invalid job-status value'),
 body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('Invalid job-type value')
])


export const validateIdParams = validationErrors([
 param('id').custom(async (value) => {
  const isValid = mongoose.Types.ObjectId.isValid(value)

  if (!isValid) {
   throw new Error('Invalid ID')
  }

  const job = await Job.findById(value);
  console.log(job);
  
  if (!job) {
   throw new Error(`No job existed with Id: ${value}`);
  }
 })
])

