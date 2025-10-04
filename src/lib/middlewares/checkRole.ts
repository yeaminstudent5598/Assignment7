import { NextRequest } from 'next/server';
import { verifyToken } from '../utils/jwt';

export const checkRole = async (request: NextRequest, requiredRole: string) => {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw { message: 'Authorization header is missing or invalid.', statusCode: 401 };
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (decoded.role !== requiredRole) {
    throw { message: 'Forbidden: You do not have permission to perform this action.', statusCode: 403 };
  }

  return decoded; 
};