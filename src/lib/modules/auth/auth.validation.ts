// src/lib/modules/auth/auth.validation.ts
import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});