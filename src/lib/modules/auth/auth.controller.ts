// src/lib/modules/auth/auth.controller.ts
import { NextRequest } from 'next/server';
import { AuthService } from './auth.service';
import { loginUserSchema } from './auth.validation';

export const AuthController = {
  login: async (request: NextRequest) => {
    const body = await request.json();
    const validatedData = loginUserSchema.parse(body);
    const result = await AuthService.login(validatedData);
    return result; // শুধু ডেটা রিটার্ন করবে
  },
};