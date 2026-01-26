import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  photoUrl: z.string().min(10, 'Provide valid image URL'),
  role: z.enum(['student', 'admin', 'tutor'], { error: 'Please select a role' }),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});