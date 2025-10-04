// src/app/api/v1/blogs/[id]/route.ts
import { catchAsync } from "@/lib/middlewares/catchAsync";
import { BlogController } from "@/lib/modules/blog/blog.controller";

export const GET = catchAsync(BlogController.getBlogById, "Blog retrieved successfully!");
export const PATCH = catchAsync(BlogController.updateBlog, "Blog updated successfully!");
export const DELETE = catchAsync(BlogController.deleteBlog, "Blog deleted successfully!");
