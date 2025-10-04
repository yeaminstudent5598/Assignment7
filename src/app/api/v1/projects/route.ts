import { catchAsync } from '@/lib/middlewares/catchAsync';
import { ProjectController } from '@/lib/modules/project/project.controller';

export const GET = catchAsync(ProjectController.getAllProjects, 'Projects retrieved successfully!');
export const POST = catchAsync(ProjectController.createProject, 'Project created successfully!', 201);