import { NextRequest } from 'next/server';
import { UserService } from './user.service';
import { createUserSchema } from './user.validation';

export const UserController = {
  register: async (request: NextRequest) => {
    // Get the request body
    const body = await request.json();

    // Validate the data using the Zod schema
    const validatedData = createUserSchema.parse(body);

    // Call the service layer with the validated data
    const newUser = await UserService.create(validatedData);
    
    return newUser;
  },
};