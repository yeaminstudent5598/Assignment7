import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * একটি নতুন JWT তৈরি করে
 * @param payload ইউজারের তথ্য (id, email)
 * @returns একটি নতুন JWT টোকেন
 */
export const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error('JWT secret is not defined in environment variables.');
  }

  const token = jwt.sign(payload, secret, {
    expiresIn: '1d', // টোকেনের মেয়াদ ১ দিন
  });

  return token;
};

/**
 * একটি JWT যাচাই করে এবং ডিকোড করা তথ্য ফেরত দেয়
 * @param token JWT টোকেন
 * @returns ডিকোড করা ইউজারের তথ্য
 */
export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error('JWT secret is not defined in environment variables.');
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    // এররটি হতে পারে টোকেনের মেয়াদ শেষ বা টোকেনটি ভুল
    throw new Error('Invalid or expired token.');
  }
};