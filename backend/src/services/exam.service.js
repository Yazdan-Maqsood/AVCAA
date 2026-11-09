import { pool } from '../config/db.js';

export const createExam = async (teacherId, data) => {
  const { title, description, language, dueDate } = data;
  const [result] = await pool.query(
    'INSERT INTO exams (teacher_id, title, description, language, due_date) VALUES (?, ?, ?, ?, ?)',
    [teacherId, title, description, language, dueDate]
  );
  return { id: result.insertId, ...data };
};

export const getTeacherExams = async (teacherId) => {
  const [rows] = await pool.query('SELECT * FROM exams WHERE teacher_id = ? ORDER BY created_at DESC', [teacherId]);
  return rows;
};

export const getAllActiveExams = async () => {
  const [rows] = await pool.query('SELECT * FROM exams WHERE is_active = TRUE');
  return rows;
};