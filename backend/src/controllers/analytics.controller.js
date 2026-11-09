import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/ApiResponse.js';
import { pool } from '../config/db.js';

export const getClassAnalytics = asyncHandler(async (req, res) => {
  // 1. Basic Counts
  const [studentCount] = await pool.query('SELECT COUNT(*) as count FROM users WHERE role = "student"');
  const [submissionCount] = await pool.query('SELECT COUNT(*) as count FROM submissions');
  
  // 2. Class Average Viva Score
  const [avgViva] = await pool.query('SELECT AVG(score) as avg_score FROM viva_responses');
  
  // 3. Authorship Breakdown (Original vs Suspicious)
  const [originalCount] = await pool.query('SELECT COUNT(*) as count FROM submissions WHERE authorship_score >= 50');
  const [suspiciousCount] = await pool.query('SELECT COUNT(*) as count FROM submissions WHERE authorship_score < 50');

  // 4. Student-wise Performance (For Bar Chart)
  const [studentPerformance] = await pool.query(`
    SELECT 
      u.name as student_name,
      AVG(r.score) as avg_score
    FROM users u
    JOIN submissions s ON u.id = s.user_id
    JOIN viva_questions q ON s.id = q.submission_id
    JOIN viva_responses r ON q.id = r.question_id
    WHERE u.role = 'student'
    GROUP BY u.id
    ORDER BY avg_score DESC
  `);

  

  // Data Formatting
  const stats = {
    totalStudents: studentCount[0].count,
    totalSubmissions: submissionCount[0].count,
    classAverageViva: avgViva[0].avg_score ? Number(avgViva[0].avg_score).toFixed(1) : "0.0",
    authorshipStats: [
      { name: 'Original (Safe)', value: originalCount[0].count, color: '#10b981' }, // Green
      { name: 'Suspicious (AI/Copied)', value: suspiciousCount[0].count, color: '#ef4444' } // Red
    ],
    studentPerformance: studentPerformance.map(item => ({
      name: item.student_name.split(' ')[0], // Sirf first name
      fullName: item.student_name,
      score: Number(item.avg_score).toFixed(1)
    }))
  };

  sendResponse(res, 200, stats, 'Class analytics fetched');
});


export const getTeacherDashboardStats = asyncHandler(async (req, res) => {
  // 1. Total Submissions
  const [totalSubs] = await pool.query('SELECT COUNT(*) as count FROM submissions');
  
  // 2. Pending Vivas (Files jo analyzed hain lekin abhi tak koi response nahi aya)
  const [pendingVivas] = await pool.query(`
    SELECT COUNT(DISTINCT s.id) as count 
    FROM submissions s 
    LEFT JOIN viva_questions q ON s.id = q.submission_id 
    LEFT JOIN viva_responses r ON q.id = r.question_id 
    WHERE s.status = 'analyzed' AND r.id IS NULL
  `);

  // 3. Flagged for Plagiarism (Authorship score 50 se kam)
  const [flagged] = await pool.query('SELECT COUNT(*) as count FROM submissions WHERE authorship_score < 50');

  // 4. Recent Submissions (Latest 5)
  const [recentSubmissions] = await pool.query(`
    SELECT s.id, s.file_name, s.status, s.authorship_score, s.created_at, u.name as student_name 
    FROM submissions s 
    JOIN users u ON s.user_id = u.id 
    ORDER BY s.created_at DESC LIMIT 5
  `);

  sendResponse(res, 200, {
    totalSubs: totalSubs[0].count,
    pendingVivas: pendingVivas[0].count,
    flagged: flagged[0].count,
    recentSubmissions
  }, 'Dashboard stats fetched');
});