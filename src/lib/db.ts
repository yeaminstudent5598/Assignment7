import { PrismaClient } from '@prisma/client';

// TypeScript-এর জন্য একটি গ্লোবাল ভ্যারিয়েবল ডিক্লেয়ার করা হচ্ছে
declare global {
  var prisma: PrismaClient | undefined;
}

// যদি prisma-এর কোনো ইনস্ট্যান্স আগে থেকেই থাকে, সেটি ব্যবহার করা হবে,
// না হলে নতুন একটি তৈরি করা হবে।
const prisma = globalThis.prisma || new PrismaClient();

// ডেভেলপমেন্ট এনভায়রনমেন্টে হট-রিলোডিং এর কারণে যেন বারবার নতুন কানেকশন তৈরি না হয়,
// তার জন্য এই ব্যবস্থা।
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;