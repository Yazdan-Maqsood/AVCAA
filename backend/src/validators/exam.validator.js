import { z } from 'zod';

export const createExamSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  language: z.enum(['python', 'cpp', 'java', 'javascript']),
  isActive: z.boolean().default(true),
});