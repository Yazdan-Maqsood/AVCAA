import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/ApiResponse.js';
import * as submissionService from '../services/submission.service.js';
import { ApiError } from '../utils/ApiError.js';
import fs from 'node:fs';

export const uploadCode = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Please upload a file');
  }
  
  const submission = await submissionService.createSubmission(req.user.id, req.file);
  sendResponse(res, 201, submission, 'File uploaded and queued for analysis');
});

export const getMySubmissions = asyncHandler(async (req, res) => {
  const submissions = await submissionService.getStudentSubmissions(req.user.id);
  sendResponse(res, 200, submissions);
});

export const getSubmissionDetails = asyncHandler(async (req, res) => {
  const submission = await submissionService.getSubmissionById(req.params.id);
  if (!submission) throw new ApiError(404, 'Submission not found');
  sendResponse(res, 200, submission);
});

export const getAllSubmissions = asyncHandler(async (req, res) => {
  const submissions = await submissionService.getAllSubmissionsForTeacher();
  sendResponse(res, 200, submissions);
});

export const getSubmissionCode = asyncHandler(async (req, res) => {
  const submission = await submissionService.getSubmissionById(req.params.id);
  if (!submission) throw new ApiError(404, 'Submission not found');

  try {
    // File ko read karein
    const codeContent = fs.readFileSync(submission.file_path, 'utf8');
    sendResponse(res, 200, { code: codeContent, language: submission.file_name.split('.').pop() });
  } catch (error) {
    throw new ApiError(500, 'Could not read the code file.');
  }
});