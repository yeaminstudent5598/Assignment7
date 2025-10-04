import { catchAsync } from '@/lib/middlewares/catchAsync';
import { ProjectController } from '@/lib/modules/project/project.controller';

export const GET = catchAsync(ProjectController.getProjectById, 'Project retrieved successfully!');
export const PATCH = catchAsync(ProjectController.updateProject, 'Project updated successfully!');
export const DELETE = catchAsync(ProjectController.deleteProject, 'Project deleted successfully!');
