import { catchAsync } from '@/lib/middlewares/catchAsync';
import { AuthController } from '@/lib/modules/auth/auth.controller';

export const PATCH = catchAsync(
  AuthController.changePassword,
  'Password changed successfully!',
  200
);