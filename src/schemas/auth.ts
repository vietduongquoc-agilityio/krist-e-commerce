import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from '@/constants/messages';
import { REGEX } from '@/constants';
import { VALIDATION_LIMITS } from '@/constants/validation';

export const signInSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(VALIDATION_LIMITS.MIN_LENGTH, ERROR_MESSAGES.FIELD_REQUIRED)
    .transform((value) => value.trim()),
  password: z
    .string()
    .trim()
    .min(VALIDATION_LIMITS.MIN_LENGTH, ERROR_MESSAGES.FIELD_REQUIRED),
});

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(VALIDATION_LIMITS.MIN_LENGTH, ERROR_MESSAGES.FIELD_REQUIRED),
    lastName: z
      .string()
      .min(VALIDATION_LIMITS.MIN_LENGTH, ERROR_MESSAGES.FIELD_REQUIRED),

    email: z
      .string()
      .trim()
      .min(VALIDATION_LIMITS.MIN_LENGTH, ERROR_MESSAGES.FIELD_REQUIRED)
      .regex(REGEX.EMAIL, ERROR_MESSAGES.INVALID_EMAIL)
      .transform((value) => value.trim()),

    phone: z
      .string()
      .min(VALIDATION_LIMITS.MIN_LENGTH, ERROR_MESSAGES.FIELD_REQUIRED),

    password: z
      .string()
      .trim()
      .min(
        VALIDATION_LIMITS.PASSWORD_MIN_LENGTH,
        ERROR_MESSAGES.INVALID_PASSWORD,
      )
      .regex(REGEX.PASSWORD, ERROR_MESSAGES.PASSWORD_PATTERN),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH,
    path: ['confirmPassword'],
  });
