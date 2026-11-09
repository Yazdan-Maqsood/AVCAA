import express from 'express';
import * as submissionController from '../controllers/submission.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo } from '../middleware/role.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

// All routes below require login
router.use(protect);

router.post('/upload', restrictTo('student'), upload.single('codeFile'), submissionController.uploadCode);
router.get('/my', restrictTo('student'), submissionController.getMySubmissions);
router.get('/all', restrictTo('teacher', 'admin'), submissionController.getAllSubmissions);
router.get('/:id', submissionController.getSubmissionDetails);
router.get('/:id/code', submissionController.getSubmissionCode); 
export default router;