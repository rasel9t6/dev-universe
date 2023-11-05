import * as z from 'zod';
export const QuestionsSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
    explanation: z.string().min(100),
    tags: z.array(z.string().min(1).max(15)).min(1).max(3)
});