import express from 'express';
import { loginUser, logoutUser, registerUser } from "../controllers/authControllers.js";
import { validateLoginInputs, validateRegisterInputs } from '../middlewares/validationMiddleware.js';


const router = express.Router();

router.route('/register').post(validateRegisterInputs, registerUser);
router.route('/login').post(validateLoginInputs, loginUser);
router.route('/logout').get(logoutUser);

export default router; 