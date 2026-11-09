import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/ApiResponse.js';
import * as examService from '../services/exam.service.js';

export const createExam = asyncHandler(async (req, res) => {
  const exam = await examService.createExam(req.user.id, req.body);
  sendResponse(res, 201, exam, 'Exam created successfully');
});

export const getMyExams = asyncHandler(async (req, res) => {
  const exams = await examService.getTeacherExams(req.user.id);
  sendResponse(res, 200, exams);
});