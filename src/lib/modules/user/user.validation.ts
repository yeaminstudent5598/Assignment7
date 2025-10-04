import { z } from 'zod';
 
export const createUserSchema = z.object({
  email: z.string().email({ message: 'Please provide a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' }),
});