import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/ApiResponse.js';
import * as authService from '../services/auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  sendResponse(res, 201, { user }, 'User registered successfully');
});

export const login = asyncHandler(async (req, res) => {
  const data = await authService.loginUser(req.body);
  sendResponse(res, 200, data, 'Logged in successfully');
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user.id);
  sendResponse(res, 200, { user }, 'User profile fetched');
});