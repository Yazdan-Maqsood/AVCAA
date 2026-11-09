import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo } from '../middleware/role.middleware.js';

const router = express.Router();
router.use(protect, restrictTo('admin'));

router.get('/', userController.getAllUsers);

export default router;