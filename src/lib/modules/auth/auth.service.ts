// src/lib/modules/auth/auth.service.ts
import prisma from '@/lib/db';
import { changePasswordSchema } from '@/lib/validations/auth';
import bcrypt from 'bcryptjs';
import { z } from 'zod'; 

export const AuthService = {
  verifyUser: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null; // ইউজার না পাওয়া গেলে বা পাসওয়ার্ড না মিললে null রিটার্ন করুন
    }

    // পাসওয়ার্ড বাদ দিয়ে শুধু ইউজার অবজেক্ট রিটার্ন করুন
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  changePassword: async (userId: string, data: z.infer<typeof changePasswordSchema>) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw { message: 'User not found.', statusCode: 404 };
    }

    const isPasswordMatch = await bcrypt.compare(data.oldPassword, user.password);
    if (!isPasswordMatch) {
      throw { message: 'Incorrect old password.', statusCode: 401 };
    }

    const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return { message: 'Password updated successfully.' };
  },
};