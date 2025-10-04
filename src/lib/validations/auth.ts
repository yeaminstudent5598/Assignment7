// src/lib/validations/auth.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, { message: 'Old password is required.' }),
  newPassword: z.string().min(6, { message: 'New password must be at least 6 characters.' }),
});

export const registerSchema = loginSchema;