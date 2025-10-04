// src/lib/validations/blog.ts
import { z } from "zod";

export const blogFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters long." }),
  thumbnail: z.string().url({ message: "Thumbnail must be a valid URL." }).optional(),
});
// আপডেটের জন্য ফর্ম স্কিমা
export const updateBlogFormSchema = blogFormSchema.partial();