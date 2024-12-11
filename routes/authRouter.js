import express from 'express'
import { loginUser, registerUser } from "../controllers/authControllers.js";
import { validateLoginInputs, validateRegisterInputs } from '../middlewares/validationMiddleware.js';


const router = express.Router();

router.route('/register').post(validateRegisterInputs, registerUser);
router.route('/login').post(validateLoginInputs, loginUser);

export default router; 