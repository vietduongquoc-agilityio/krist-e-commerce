import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from '@/constants/messages';

export const signInSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, ERROR_MESSAGES.FIELD_REQUIRED)
    .transform((value) => value.trim()),
  password: z.string().trim().min(1, ERROR_MESSAGES.FIELD_REQUIRED),
});
