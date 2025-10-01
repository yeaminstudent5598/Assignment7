import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

// কন্ট্রোলার ফাংশনের জন্য একটি টাইপ ডিফাইন করা
type ControllerFunction = (request: NextRequest, params: any) => Promise<any>;

/**
 * একটি কন্ট্রোলার ফাংশনকে র‍্যাপ করে এবং এরর হ্যান্ডেল করে।
 * এটি সফল হলে একটি স্ট্যান্ডার্ড JSON রেসপন্স তৈরি করে এবং
 * ব্যর্থ হলে বিভিন্ন ধরনের এরর শনাক্ত করে সঠিক স্ট্যাটাস কোডসহ রেসপন্স পাঠায়।
 * @param fn কন্ট্রোলার ফাংশন
 * @param successMessage সফল হলে যে মেসেজটি দেখানো হবে
 * @param successStatus সফল হলে যে স্ট্যাটাস কোড পাঠানো হবে
 */
export const catchAsync = (
  fn: ControllerFunction,
  successMessage: string = 'Operation successful!',
  successStatus: number = 200
) => {
  return async (request: NextRequest, params: any) => {
    try {
      // মূল কন্ট্রোলার ফাংশনটিকে কল করা হচ্ছে
      const result = await fn(request, params);

      // সফল হলে, কন্ট্রোলার থেকে পাওয়া ডেটা দিয়ে রেসপন্স তৈরি
      return NextResponse.json(
        {
          success: true,
          message: successMessage,
          data: result,
        },
        { status: successStatus }
      );
    } catch (error: any) {
      // Zod ভ্যালিডেশন এরর বিশেষভাবে হ্যান্ডেল করা
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation Error',
            errors: error.issues.map((issue) => ({
              field: issue.path.join('.'),
              message: issue.message,
            })),
          },
          { status: 400 } // Bad Request
        );
      }

      // কাস্টম এরর (যেমন: 'Invalid credentials', 'User already exists') হ্যান্ডেল করা
      if (error.statusCode) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: error.statusCode }
        );
      }

      // অন্যান্য সব অপ্রত্যাশিত এররের জন্য
      console.error('💥 UNHANDLED API ERROR:', error);
      return NextResponse.json(
        { success: false, message: 'An internal server error occurred.' },
        { status: 500 } // Internal Server Error
      );
    }
  };
};