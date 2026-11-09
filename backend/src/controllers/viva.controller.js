import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/ApiResponse.js';
import * as vivaService from '../services/viva.service.js';
import { ApiError } from '../utils/ApiError.js';
import { pool } from '../config/db.js';

export const startViva = asyncHandler(async (req, res) => {
  const { submissionId } = req.body;
  const questions = await vivaService.generateVivaQuestions(submissionId, req.user.id);
  sendResponse(res, 200, { questions }, 'Viva started');
});

export const getQuestions = asyncHandler(async (req, res) => {
  const questions = await vivaService.getVivaQuestions(req.params.id, req.user.id);
  sendResponse(res, 200, { questions });
});

export const submitAnswer = asyncHandler(async (req, res) => {
  // 🔥 FIX: Frontend se 'answer' aa raha hai
  const { questionId, answer } = req.body; 
  const submissionId = req.params.id; // URL se id lein

  if (!questionId || !answer || !answer.trim()) {
    throw new ApiError(400, 'Question ID and answer are required');
  }

  const evaluation = await vivaService.evaluateVivaAnswer(
    submissionId,
    req.user.id,
    Number(questionId),
    answer.trim()
  );
  sendResponse(res, 200, evaluation, 'Answer evaluated and saved');
});

export const getMyFeedback = asyncHandler(async (req, res) => {
  const studentId = req.user.id;
  // Service function call karein (neeche banayenge)
  const feedbacks = await vivaService.getStudentFeedback(studentId);
  sendResponse(res, 200, feedbacks, 'Feedback fetched successfully');
});

export const getStudentAnalytics = asyncHandler(async (req, res) => {
  const studentId = req.user.id;

  // 1. Har file ka viva average aur authorship score nikalain
  const [analytics] = await pool.query(`
    SELECT 
      s.file_name,
      s.authorship_score,
      s.created_at,
      AVG(r.score) as avg_viva_score
    FROM submissions s
    LEFT JOIN viva_questions q ON s.id = q.submission_id
    LEFT JOIN viva_responses r ON q.id = r.question_id
    WHERE s.user_id = ? AND s.status = 'analyzed'
    GROUP BY s.id
    ORDER BY s.created_at ASC
  `, [studentId]);

  // 2. Data ko format karein (Chart ke liye)
  const formattedData = analytics.map(item => ({
    name: item.file_name.length > 15 ? item.file_name.substring(0, 12) + '...' : item.file_name, // Chote naam
    fullName: item.file_name,
    vivaScore: Number(item.avg_viva_score) ? Number(Number(item.avg_viva_score).toFixed(1)) : 0,
    authorshipScore: Number(item.authorship_score) ? Number(item.authorship_score) : 0,
    date: item.created_at
  }));

  sendResponse(res, 200, formattedData, 'Analytics fetched');
});