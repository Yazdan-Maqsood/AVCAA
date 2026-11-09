import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async ({ name, email, password, role = 'student' }) => {
  // Check if user exists
  const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    throw new ApiError(400, 'User with this email already exists.');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Insert user
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role]
  );

  const newUser = { id: result.insertId, name, email, role };
  return newUser;
};

export const loginUser = async ({ email, password }) => {
  // Find user
  const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length === 0) {
    throw new ApiError(401, 'Incorrect email or password.');
  }

  const user = users[0];

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Incorrect email or password.');
  }

  // Generate Token
  const token = generateToken({ id: user.id, role: user.role });

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

export const getUserById = async (id) => {
  const [users] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
  if (users.length === 0) throw new ApiError(404, 'User not found');
  return users[0];
};