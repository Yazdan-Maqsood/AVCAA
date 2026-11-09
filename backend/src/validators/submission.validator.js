import { z } from 'zod';

export const uploadCodeSchema = z.object({
  // Note: file validation happens in multer middleware
  // This schema can be used if we need to validate other form fields alongside the file
  examId: z.string().optional(),
  language: z.string().optional(),
});