import { catchAsync } from '@/lib/middlewares/catchAsync';
import { BlogController } from '@/lib/modules/blog/blog.controller';

export const GET = catchAsync(
    BlogController.getAllBlogs,
    'Blogs retrieved successfully!'
);

export const POST = catchAsync(
  BlogController.createBlog,
  'Blog created successfully!',
  201
);