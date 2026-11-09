import express from 'express';
import * as analyticsController from '../controllers/analytics.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo } from '../middleware/role.middleware.js';

const router = express.Router();
router.use(protect, restrictTo('teacher', 'admin'));

router.get('/class', analyticsController.getClassAnalytics);
router.get('/teacher-dashboard', analyticsController.getTeacherDashboardStats);

export default router;