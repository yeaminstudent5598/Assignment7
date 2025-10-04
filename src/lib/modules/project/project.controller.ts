import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { projectSchema, updateProjectSchema } from './project.validation';
import { ProjectService } from './project.service';

const checkAdmin = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    throw { message: 'Forbidden', statusCode: 403 };
  }
};

export const ProjectController = {
  createProject: async (req: NextRequest) => {
    await checkAdmin();
    const body = await req.json();
    const validatedData = projectSchema.parse(body);
    return await ProjectService.create(validatedData);
  },

  getAllProjects: () => ProjectService.findAll(),

  getProjectById: async (req: NextRequest, { params: awaitedParams }: { params: Promise<{ id: string }> }) => {
    const params = await awaitedParams; // ✅ await করা হলো
    return ProjectService.findById(params.id);
  },

  updateProject: async (req: NextRequest, { params: awaitedParams }: { params: Promise<{ id: string }> }) => {
    await checkAdmin();
    const params = await awaitedParams;
    const body = await req.json();
    const validatedData = updateProjectSchema.parse(body);
    return ProjectService.update(params.id, validatedData);
  },

  deleteProject: async (req: NextRequest, { params: awaitedParams }: { params: Promise<{ id: string }> }) => {
    await checkAdmin();
    const params = await awaitedParams;
    return ProjectService.remove(params.id);
  },
};
