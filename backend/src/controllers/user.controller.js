import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/ApiResponse.js';
import * as userService from '../services/user.service.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  sendResponse(res, 200, users);
});