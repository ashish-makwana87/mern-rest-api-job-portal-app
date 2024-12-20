import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/jobModel.js';
import User from '../models/userModel.js';

const validationErrors = (values) => {

 return [values, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
   const errorMessages = errors.array().map((object) => object.msg);

   if (errorMessages[0].startsWith('No job')) {
    throw new NotFoundError(errorMessages);
   }
   
   if (errorMessages[0].startsWith('Not authorized')) {
    throw new UnauthenticatedError(errorMessages);
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
 param('id').custom(async (value, {req}) => {
  const isValid = mongoose.Types.ObjectId.isValid(value)

  if (!isValid) {
   throw new Error('Invalid ID')
  }
  
  const job = await Job.findById(value);
  
  if (!job) {
   throw new Error(`No job existed with Id: ${value}`);
  }

  const {role, userId} = req.user; 
  
  const isAdmin = role === 'admin'; 
  const isOwner = userId === job.createdBy.toString(); 
 
  if(!isAdmin && !isOwner) {
    throw new Error('Not authorized to access this route')
  }

 })
]);

export const validateRegisterInputs = validationErrors([
 body('name').notEmpty().withMessage('Please provide name'),
 body('lastName').notEmpty().withMessage('Please provide last name'),
 body('location').notEmpty().withMessage('Please provide location'),
 body('password').notEmpty().withMessage('Please provide password').isLength({ min: 6 }).withMessage('Password must be of at least 6 characters'),
 body('email').notEmpty().withMessage('Please provide an email').isEmail().withMessage('Incorrect email format').custom(async (value) => {

  const user = await User.findOne({ email: value });

  if (user) {
   throw new Error('Email already exists')
  }
 }),
])


export const validateLoginInputs = validationErrors([
 body('email').notEmpty().withMessage('Please provide an email').isEmail().withMessage('Incorrect email format'),
 body('password').notEmpty().withMessage('Please provide password')
])

