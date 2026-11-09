import express from 'express';
import * as reportController from '../controllers/report.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo } from '../middleware/role.middleware.js';

const router = express.Router();
router.use(protect);

router.get('/:id', reportController.getSubmissionReport);
router.get('/analytics/class', restrictTo('teacher', 'admin'), reportController.getClassAnalytics);

export default router;