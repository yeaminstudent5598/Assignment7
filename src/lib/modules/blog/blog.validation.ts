// src/lib/modules/blog/blog.validation.ts
import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  content: z.string().min(1, { message: 'Content is required.' }),
});