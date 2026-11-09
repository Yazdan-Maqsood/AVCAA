import { ApiError } from '../utils/ApiError.js';

// Zod schema validator middleware
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const errorMessage = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
    next(new ApiError(400, `Validation Error: ${errorMessage}`));
  }
};