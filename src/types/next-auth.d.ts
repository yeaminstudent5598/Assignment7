// src/types/next-auth.d.ts

import 'next-auth';
import 'next-auth/jwt';

// next-auth/jwt মডিউলটি ডিক্লেয়ার করা হচ্ছে
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    role: string;
  }
}

// next-auth মডিউলটি ডিক্লেয়ার করা হচ্ছে
declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * available here as `user`.
   */
  interface User {
    id: string;
    role: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }
}