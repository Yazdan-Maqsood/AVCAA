import { z } from 'zod';

export const submitAnswerSchema = z.object({
  questionId: z.number(),
  answerText: z.string().min(1, 'Answer cannot be empty'),
});

export const submitModificationSchema = z.object({
  questionId: z.number(),
  modifiedCode: z.string().min(1, 'Code cannot be empty'),
});