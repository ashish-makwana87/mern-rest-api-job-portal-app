import express from 'express';
import { getApplicationStats, getCurrentUser, updateUser } from '../controllers/userControllers.js';
import { authenticateUser, protectedRoute } from '../middlewares/authMiddleware.js';
import { validateUpdateUserInputs } from '../middlewares/validationMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.route('/current-user').get(getCurrentUser)
router.route('/admin/app-stats').get(protectedRoute('admin'), getApplicationStats)
router.route('/update-user').patch(upload.single('avatar'), validateUpdateUserInputs, updateUser)

export default router;