import { NextRequest } from 'next/server';
import { verifyToken } from '../utils/jwt';

/**
 * রিকোয়েস্ট থেকে JWT টোকেন যাচাই করে এবং নির্দিষ্ট রোলের সাথে মেলায়।
 * @param request - Next.js রিকোয়েস্ট অবজেক্ট
 * @param requiredRole - যে রোলটি প্রয়োজন (e.g., 'ADMIN')
 * @returns ডিকোড করা টোকেনের পেলোড
 * @throws যদি টোকেন না থাকে, ভুল হয়, বা রোল না মেলে
 */
export const checkRole = async (request: NextRequest, requiredRole: string) => {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // AppError ব্যবহার করলে catchAsync এটিকে 401 হিসেবে ধরবে
    throw { message: 'Authorization header is missing or invalid.', statusCode: 401 };
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (decoded.role !== requiredRole) {
    // AppError ব্যবহার করলে catchAsync এটিকে 403 হিসেবে ধরবে
    throw { message: 'Forbidden: You do not have permission to perform this action.', statusCode: 403 };
  }

  return decoded; // সফল হলে ডিকোড করা তথ্য ফেরত পাঠানো হচ্ছে
};