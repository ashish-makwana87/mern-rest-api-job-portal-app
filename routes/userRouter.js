import express from 'express';
import { getApplicationStats, getCurrentUser, updateUser } from '../controllers/userControllers.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { validateUpdateUserInputs } from '../middlewares/validationMiddleware.js';


const router = express.Router();

router.route('/current-user').get(getCurrentUser)
router.route('/admin/app-stats').get(getApplicationStats)
router.route('/update-user').patch(validateUpdateUserInputs, updateUser)

export default router;