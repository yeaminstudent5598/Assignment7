// src/lib/modules/blog/blog.controller.ts
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { createBlogSchema, updateBlogSchema } from "./blog.validation";
import { BlogService } from "./blog.service";

const checkAdmin = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    throw { message: "Forbidden: You do not have permission.", statusCode: 403 };
  }
};

export const BlogController = {
  createBlog: async (request: NextRequest) => {
  await checkAdmin();
  const body = await request.json();
  console.log('Received body:', body); // এটা দেখুন
  const validatedData = createBlogSchema.parse(body);
  console.log('Validated data:', validatedData); // এটাও দেখুন
  return await BlogService.create(validatedData);
  },

  getAllBlogs: async () => {
    return await BlogService.findAll();
  },

  getBlogById: async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return await BlogService.findById(id);
  },

  updateBlog: async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    await checkAdmin();
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateBlogSchema.parse(body);
    return await BlogService.update(id, validatedData);
  },

  deleteBlog: async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    await checkAdmin();
    return await BlogService.remove(id);
  },
};
