// src/app/api/auth/login/route.ts
import { catchAsync } from '@/lib/middlewares/catchAsync';
import { AuthController } from '@/lib/modules/auth/auth.controller';

export const POST = catchAsync(
  AuthController.login,
  'Login successful!',
  200
);