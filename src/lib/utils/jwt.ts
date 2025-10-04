import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error('JWT secret is not defined in environment variables.');
  }

  const token = jwt.sign(payload, secret, {
    expiresIn: '1d',
  });

  return token;
};


export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error('JWT secret is not defined in environment variables.');
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token.');
  }
};