import express from 'express';
import * as vivaController from '../controllers/viva.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/start', vivaController.startViva);
router.get('/:id/questions', vivaController.getQuestions);
router.post('/:id/answer', vivaController.submitAnswer);
router.get('/my-feedback', vivaController.getMyFeedback);
router.get('/my-analytics', vivaController.getStudentAnalytics);

export default router;