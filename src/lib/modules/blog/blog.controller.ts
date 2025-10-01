import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { createBlogSchema } from './blog.validation';
import { BlogService } from './blog.service';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export const BlogController = {
  /**
   * একটি নতুন ব্লগ পোস্ট তৈরি করে।
   * শুধুমাত্র 'ADMIN' রোলধারী ইউজাররাই এই কাজটি করতে পারবে।
   * @param request - Next.js রিকোয়েস্ট অবজেক্ট
   * @returns নতুন তৈরি হওয়া ব্লগ অবজেক্ট
   */
  createBlog: async (request: NextRequest) => {
    // ধাপ ১: সেশন থেকে বর্তমান লগইন করা ইউজারের তথ্য বের করা
    const session = await getServerSession(authOptions);
    
    // ডিবাগিং-এর জন্য: console.log('SESSION ON SERVER:', session);

    // ধাপ ২: ইউজারের অনুমতি যাচাই করা (Authorization)
    // নিশ্চিত করা হচ্ছে যে ইউজার লগইন করা আছে এবং তার রোল 'ADMIN'
    if (!session || session.user.role !== 'ADMIN') {
      throw { message: 'Forbidden: You do not have permission.', statusCode: 403 };
    }

    // ধাপ ৩: রিকোয়েস্টের বডি থেকে ডেটা নেওয়া এবং ভ্যালিডেট করা
    const body = await request.json();
    const validatedData = createBlogSchema.parse(body);

    // ধাপ ৪: সার্ভিসকে কল করে ডাটাবেসে নতুন ব্লগ তৈরি করা
    const newBlog = await BlogService.create(validatedData);

    return newBlog;
  },

  // ভবিষ্যতে এখানে অন্যান্য কন্ট্রোলার ফাংশন যোগ করা যাবে
  // যেমন: getAllBlogs, updateBlog, deleteBlog ইত্যাদি
};