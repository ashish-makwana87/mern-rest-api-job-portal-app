import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors';


const validationErrors = (values) => {

 return [values, (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
   const errorMessages = errors.array().map((object) => object.msg)


   throw new BadRequestError(errorMessages);
  }

  next();
 }]
};


export validateRegisterInputs = validationErrors([body('name').notEmpty().withMessage('Name is required')])