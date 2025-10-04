import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';

export const ProjectService = {
  create: (data: Prisma.ProjectCreateInput) => prisma.project.create({ data }),
  findAll: () => prisma.project.findMany({ orderBy: { createdAt: 'desc' } }),
  findById: async (id: string) => {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) throw { message: 'Project not found.', statusCode: 404 };
    return project;
  },
  update: (id: string, data: Prisma.ProjectUpdateInput) =>
    prisma.project.update({ where: { id }, data }),
  remove: (id: string) => prisma.project.delete({ where: { id } }),
};
 