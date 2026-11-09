import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/ApiResponse.js';
import { pool } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const [users] = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
  sendResponse(res, 200, users);
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['student', 'teacher', 'admin'].includes(role)) {
    throw new ApiError(400, 'Invalid role specified');
  }

  await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
  sendResponse(res, 200, null, 'User role updated successfully');
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
  sendResponse(res, 200, null, 'User deleted successfully');
});