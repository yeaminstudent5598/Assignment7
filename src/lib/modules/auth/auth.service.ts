// src/lib/modules/auth/auth.service.ts
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

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
};