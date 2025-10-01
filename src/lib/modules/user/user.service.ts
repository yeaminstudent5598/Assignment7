import prisma from '@/lib/db';
import type { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const UserService = {
  create: async (userData: Prisma.UserCreateInput) => {
    const { email, password } = userData;

    // Check if a user with the given email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      // Throw a specific error that catchAsync can handle
      throw { message: 'A user with this email already exists.', statusCode: 409 };
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      // Exclude the password from the returned object
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return newUser;
  },
};