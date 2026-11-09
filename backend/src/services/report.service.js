import { pool } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const generateReport = async (submissionId) => {
  const [submissions] = await pool.query(
    `SELECT s.*, u.name as student_name, u.email 
     FROM submissions s 
     JOIN users u ON s.user_id = u.id 
     WHERE s.id = ?`,
    [submissionId]
  );

  if (submissions.length === 0) {
    throw new ApiError(404, 'Submission not found');
  }

  const [vivaDetails] = await pool.query(
    `SELECT q.id, q.question_text, q.difficulty, r.answer_text, r.score, r.feedback 
     FROM viva_questions q 
     LEFT JOIN viva_responses r ON q.id = r.question_id 
     WHERE q.submission_id = ?`,
    [submissionId]
  );

  return {
    submission: submissions[0],
    vivaDetails,
  };
};

export const getAnalytics = async () => {
  const [total] = await pool.query('SELECT COUNT(*) as count FROM submissions');
  const [avg] = await pool.query('SELECT AVG(authorship_score) as avg_score FROM submissions WHERE authorship_score IS NOT NULL');
  
  return {
    totalSubmissions: total[0].count,
    averageScore: avg[0].avg_score || 0,
  };
};