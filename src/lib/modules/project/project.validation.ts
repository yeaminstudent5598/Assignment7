import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(3, { message: 'Project title is required.' }),
  description: z.string().min(10, { message: 'Description is required.' }),
  features: z.string().min(1, { message: 'At least one feature is required.' }),
  technologies: z.string().min(1, { message: 'At least one technology is required.' }),
  liveLink: z.string().url({ message: 'Please provide a valid URL.' }).optional().or(z.literal('')),
  githubLink: z.string().url({ message: 'Please provide a valid URL.' }).optional().or(z.literal('')),
  thumbnail: z.string().url({ message: 'Please provide a valid image URL.' }).optional().or(z.literal('')),
});

export const updateProjectSchema = projectSchema.partial();