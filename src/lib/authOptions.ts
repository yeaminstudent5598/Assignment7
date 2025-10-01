// src/lib/authOptions.ts
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthService } from '@/lib/modules/auth/auth.service';

export const authOptions: AuthOptions = {
  // ১. প্রোভাইডার কনফিগারেশন: কীভাবে ইউজার লগইন করবে
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password.');
        }

        // আমাদের auth.service থেকে ইউজার ভেরিফাই করা হচ্ছে
        const user = await AuthService.verifyUser(
          credentials.email,
          credentials.password
        );

        // ভেরিফিকেশন সফল হলে ইউজার অবজেক্ট রিটার্ন করা হচ্ছে
        if (user) {
          return user;
        }
        
        // ভেরিফিকেশন ব্যর্থ হলে null রিটার্ন করা হচ্ছে, যা এরর ট্রিগার করবে
        return null;
      },
    }),
  ],

  // ২. সেশন স্ট্র্যাটেজি: আমরা JWT ব্যবহার করব
  session: {
    strategy: 'jwt',
  },

  // ৩. কলব্যাক: JWT এবং সেশনে কাস্টম ডেটা (id, role) যোগ করার জন্য
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  // ৪. পৃষ্ঠা কনফিগারেশন (ঐচ্ছিক)
  pages: {
    signIn: '/login',
    error: '/login', // লগইন ব্যর্থ হলে লগইন পেজেই ফেরত পাঠাবে
  },

  // ৫. সিক্রেট কী
  secret: process.env.AUTH_SECRET,
};