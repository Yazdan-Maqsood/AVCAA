import { pool } from '../config/db.js';
import axios from 'axios';
import path from 'node:path';
import fs from 'node:fs';

const languageByExtension = {
  '.cpp': 'cpp',
  '.java': 'java',
  '.js': 'javascript',
  '.py': 'python',
  '.txt': 'python',
};

export const createSubmission = async (userId, file) => {
  // 1. Save to Database
  const [result] = await pool.query(
    'INSERT INTO submissions (user_id, file_name, file_path, status) VALUES (?, ?, ?, ?)',
    [userId, file.originalname, file.path, 'pending']
  );
  const submissionId = result.insertId;

  // 2. Trigger AI Analysis (Fire and forget - process background mein chalega)
  triggerAIAnalysis(submissionId, file.path).catch((error) => {
    console.error(`AI analysis failed for submission ${submissionId}:`, error);
  });

  return { id: submissionId, fileName: file.originalname, status: 'pending' };
};

const triggerAIAnalysis = async (submissionId, filePath) => {
  try {
    // Read file content synchronously
    const codeContent = fs.readFileSync(filePath, 'utf8');
    
    // Derive language from file extension
    const ext = path.extname(filePath).toLowerCase();
    const language = languageByExtension[ext] || 'python';

    console.log(`Sending code to AI Service for Submission: ${submissionId}...`);

    // 1. Call Python AI Service for Analysis
    const response = await axios.post(`http://localhost:8000/api/analyze`, {
      code: codeContent,
      language: language, 
    });

    // 2. Update Database with AI results
    await pool.query(
      'UPDATE submissions SET status = ?, authorship_score = ?, analysis_data = ? WHERE id = ?',
      ['analyzed', response.data.authorship_score || 85.5, JSON.stringify(response.data), submissionId]
    );
    console.log(`✅ Analysis complete for submission ${submissionId}`);

    // ==========================================
    // 🔥 NAYA CODE: Generate Viva Questions
    // ==========================================
    console.log(`Generating Viva questions for submission ${submissionId}...`);
    
    const vivaResponse = await axios.post(`http://localhost:8000/api/generate-viva`, {
      code: codeContent,
      language,
      analysis_data: response.data,
      num_questions: 3
    });

    // Save generated questions to Database
    const questions = vivaResponse.data.questions || [];
    for (const q of questions) {
      await pool.query(
        'INSERT INTO viva_questions (submission_id, question_text, difficulty) VALUES (?, ?, ?)',
        [submissionId, q.text, q.difficulty]
      );
    }
    
    console.log(`✅ Viva questions generated for submission ${submissionId}`);
    // ==========================================
    
  } catch (error) {
    console.error('❌ Error calling AI service:', error.message);
    
    // Log exact error from Python if available
    if (error.response) {
        console.error('Python Error Details:', error.response.data);
    }
    
    await pool.query('UPDATE submissions SET status = ? WHERE id = ?', ['analysis_failed', submissionId]);
  }
};

export const getStudentSubmissions = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM submissions WHERE user_id = ? ORDER BY created_at DESC', [userId]);
  return rows;
};

export const getSubmissionById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM submissions WHERE id = ?', [id]);
  return rows[0];
};

export const getAllSubmissionsForTeacher = async () => {
  const [rows] = await pool.query(`
    SELECT s.id, s.file_name, s.status, s.authorship_score, s.created_at, u.name as student_name 
    FROM submissions s 
    JOIN users u ON s.user_id = u.id 
    ORDER BY s.created_at DESC
  `);
  return rows;
};