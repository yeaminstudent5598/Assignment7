// src/lib/modules/auth/auth.controller.ts
import { NextRequest } from 'next/server';
import { AuthService } from './auth.service';
import { loginUserSchema } from './auth.validation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { changePasswordSchema } from '@/lib/validations/auth';

export const AuthController = {
  changePassword: async (request: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw { message: 'Unauthenticated.', statusCode: 401 };
    }

    const body = await request.json();
    const validatedData = changePasswordSchema.parse(body);

    return await AuthService.changePassword(session.user.id, validatedData);
  },
};