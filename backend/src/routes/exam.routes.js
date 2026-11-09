import express from 'express';
import * as examController from '../controllers/exam.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo } from '../middleware/role.middleware.js';

const router = express.Router();
router.use(protect);

router.post('/', restrictTo('teacher'), examController.createExam);
router.get('/my', restrictTo('teacher'), examController.getMyExams);

export default router;