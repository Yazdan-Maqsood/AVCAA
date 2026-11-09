import express from 'express';
import authRoutes from './auth.routes.js';
import submissionRoutes from './submission.routes.js';
import vivaRoutes from './viva.routes.js';
import reportRoutes from './report.routes.js';
import adminRoutes from './admin.routes.js';
import examRoutes from './exam.routes.js';
import analyticsRoutes from './analytics.routes.js';
import userRoutes from './user.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/submissions', submissionRoutes);
router.use('/viva', vivaRoutes);
router.use('/reports', reportRoutes);
router.use('/admin', adminRoutes);
router.use('/exams', examRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/users', userRoutes);

export default router;