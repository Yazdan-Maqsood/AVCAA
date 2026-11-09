import { pool } from '../config/db.js';

// Make sure you have an audit_logs table in your SQL schema
export const createLog = async (userId, action, details = '') => {
  try {
    await pool.query(
      'INSERT INTO audit_logs (user_id, action, details) VALUES (?, ?, ?)',
      [userId, action, details]
    );
  } catch (error) {
    console.error('Failed to create audit log:', error.message);
  }
};