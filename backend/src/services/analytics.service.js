import { pool } from '../config/db.js';

export const getClassPerformance = async () => {
  // Aggregated stats for class dashboard
  const [scoreDistribution] = await pool.query(`
    SELECT 
      CASE 
        WHEN authorship_score >= 80 THEN 'High (80-100)'
        WHEN authorship_score >= 50 THEN 'Medium (50-79)'
        ELSE 'Low (0-49)'
      END as range_name,
      COUNT(*) as count
    FROM submissions 
    WHERE authorship_score IS NOT NULL
    GROUP BY range_name
  `);

  const [difficultyStats] = await pool.query(`
    SELECT q.difficulty, AVG(r.score) as avg_score, COUNT(r.id) as total_answers
    FROM viva_questions q
    JOIN viva_responses r ON q.id = r.question_id
    GROUP BY q.difficulty
  `);

  return { scoreDistribution, difficultyStats };
};