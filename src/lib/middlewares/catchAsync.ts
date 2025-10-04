import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

// কন্ট্রোলার ফাংশনের জন্য একটি টাইপ ডিফাইন করা
type ControllerFunction = (request: NextRequest, params: any) => Promise<any>;


export const catchAsync = (
  fn: ControllerFunction,
  successMessage: string = 'Operation successful!',
  successStatus: number = 200
) => {
  return async (request: NextRequest, params: any) => {
    try {
      const result = await fn(request, params);

      return NextResponse.json(
        {
          success: true,
          message: successMessage,
          data: result,
        },
        { status: successStatus }
      );
    } catch (error: any) {
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
          { status: 400 } 
        );
      }

      if (error.statusCode) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: error.statusCode }
        );
      }

      console.error('💥 UNHANDLED API ERROR:', error);
      return NextResponse.json(
        { success: false, message: 'An internal server error occurred.' },
        { status: 500 } // Internal Server Error
      );
    }
  };
};