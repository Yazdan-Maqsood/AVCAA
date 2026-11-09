import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/ApiResponse.js';
import { pool } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

// Get detailed report for a specific submission
export const getSubmissionReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const [submissions] = await pool.query(
    `SELECT s.*, u.name as student_name, u.email 
     FROM submissions s 
     JOIN users u ON s.user_id = u.id 
     WHERE s.id = ?`,
    [id]
  );

  if (submissions.length === 0) {
    throw new ApiError(404, 'Report not found');
  }

  const [questions] = await pool.query(
    `SELECT q.*, r.answer_text, r.score, r.feedback 
     FROM viva_questions q 
     LEFT JOIN viva_responses r ON q.id = r.question_id 
     WHERE q.submission_id = ?`,
    [id]
  );

  sendResponse(res, 200, {
    submission: submissions[0],
    vivaDetails: questions,
  });
});

// Class-wide analytics for teachers
export const getClassAnalytics = asyncHandler(async (req, res) => {
  const [totalSubmissions] = await pool.query('SELECT COUNT(*) as total FROM submissions');
  const [avgScores] = await pool.query('SELECT AVG(authorship_score) as avg_authorship FROM submissions WHERE authorship_score IS NOT NULL');
  
  const [difficultyStats] = await pool.query(
    `SELECT q.difficulty, AVG(r.score) as avg_score 
     FROM viva_questions q 
     JOIN viva_responses r ON q.id = r.question_id 
     GROUP BY q.difficulty`
  );

  sendResponse(res, 200, {
    totalSubmissions: totalSubmissions[0].total,
    averageAuthorshipScore: avgScores[0].avg_authorship || 0,
    difficultyBreakdown: difficultyStats,
  });
});