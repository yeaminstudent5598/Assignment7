// src/lib/modules/blog/blog.validation.ts
import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters long." }),
  thumbnail: z.string().url({ message: "Thumbnail must be a valid URL." }), // required
});

export const updateBlogSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }).optional(),
  content: z.string().min(10, { message: "Content must be at least 10 characters long." }).optional(),
  thumbnail: z.string().url({ message: "Thumbnail must be a valid URL." }).optional(), // optional in update
});