'use server';
import { signIn, signOut } from '@/auth';

export const githubLogin = async () => {
  await signIn('github', { redirectTo: '/auth/callback' });
};

export const googleLogin = async () => {
  await signIn('google', { redirectTo: '/auth/callback' });
};

export const logOut = async () => {
  await signOut({ redirectTo: '/login' });
};
