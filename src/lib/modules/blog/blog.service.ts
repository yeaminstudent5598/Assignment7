// src/lib/modules/blog/blog.service.ts
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const BlogService = {
  create: async (blogData: Prisma.BlogCreateInput) => {
    return prisma.blog.create({ data: blogData });
  },
  findAll: async () => {
    return prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  },
  findById: async (id: string) => {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) throw { message: "Blog not found.", statusCode: 404 };
    return blog;
  },
  update: async (id: string, blogData: Prisma.BlogUpdateInput) => {
    return prisma.blog.update({ where: { id }, data: blogData });
  },
  remove: async (id: string) => {
    await prisma.blog.delete({ where: { id } });
    return { message: "Blog deleted successfully." };
  },
};
