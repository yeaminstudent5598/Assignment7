import { catchAsync } from '@/lib/middlewares/catchAsync';
import { UserController } from '@/lib/modules/user/user.controller';

export const POST = catchAsync(
  UserController.register,          // Controller function
  'User registered successfully!',  // Success message
  201                               // Success status code
);