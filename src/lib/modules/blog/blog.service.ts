import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';

export const BlogService = {
  create: async (blogData: Prisma.BlogCreateInput) => {
    const newBlog = await prisma.blog.create({
      data: blogData,
    });
    return newBlog;
  },
};