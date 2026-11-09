import { pool } from '../config/db.js';
import { evaluateAnswer } from '../integrations/aiService.client.js';
import { ApiError } from '../utils/ApiError.js';
import fs from 'node:fs/promises';

export const generateVivaQuestions = async (submissionId, userId) => {
  const [submissions] = await pool.query(
    'SELECT id FROM submissions WHERE id = ? AND user_id = ?',
    [submissionId, userId]
  );
  if (submissions.length === 0) throw new ApiError(404, 'Submission not found');

  const questions = await getVivaQuestions(submissionId, userId);
  if (questions.length === 0) {
    throw new ApiError(409, 'Viva questions are not available for this submission yet');
  }
  return questions;
};

export const getVivaQuestions = async (submissionId, userId) => {
  const [submissions] = await pool.query(
    'SELECT id FROM submissions WHERE id = ? AND user_id = ?',
    [submissionId, userId]
  );
  if (submissions.length === 0) throw new ApiError(404, 'Submission not found');

  const [rows] = await pool.query('SELECT * FROM viva_questions WHERE submission_id = ?', [submissionId]);
  return rows.map(({ id, question_text, difficulty }) => ({
    id,
    text: question_text,
    difficulty,
  }));
};

export const evaluateVivaAnswer = async (submissionId, userId, questionId, answer) => {
  const [questions] = await pool.query(
    `SELECT viva_questions.id, viva_questions.question_text, submissions.file_path
     FROM viva_questions
     INNER JOIN submissions ON submissions.id = viva_questions.submission_id
     WHERE submissions.id = ? AND submissions.user_id = ? AND viva_questions.id = ?`,
    [submissionId, userId, questionId]
  );
  if (questions.length === 0) throw new ApiError(404, 'Viva question not found');

  const question = questions[0];
  
  // Code read karein context ke liye
  let codeContext = "";
  try {
    codeContext = await fs.readFile(question.file_path, 'utf8');
  } catch (e) {
    console.error("Could not read file:", e.message);
  }

  // AI ko evaluate karne ke liye bhejein
  const evaluation = await evaluateAnswer(question.question_text, answer, codeContext);

  // Database mein save karein
  await pool.query(
    'INSERT INTO viva_responses (question_id, answer_text, score, feedback) VALUES (?, ?, ?, ?)',
    [questionId, answer, evaluation.score, evaluation.feedback]
  );

  return {
    questionId,
    score: evaluation.score,
    feedback: evaluation.feedback,
    isConsistent: evaluation.is_consistent,
  };
};

export const getStudentFeedback = async (studentId) => {
  const [rows] = await pool.query(`
    SELECT 
      r.id as response_id, 
      r.answer_text, 
      r.score as viva_score, 
      r.feedback as ai_feedback, 
      r.created_at as response_date,
      q.question_text, 
      q.difficulty,
      s.id as submission_id,
      s.file_name,
      s.authorship_score
    FROM viva_responses r
    JOIN viva_questions q ON r.question_id = q.id
    JOIN submissions s ON q.submission_id = s.id
    WHERE s.user_id = ?
    ORDER BY s.created_at DESC, r.created_at ASC
  `, [studentId]);
  
  return rows;
};