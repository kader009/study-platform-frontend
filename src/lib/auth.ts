'use server';
import { signIn, signOut } from '@/auth';

export const logIn = async () => {
  await signIn('github', { redirectTo: '/' }); 
};

export const GooglelogIn = async () => {
  await signIn('google', { redirectTo: '/' }); 
};

export const logOut = async () => {
  await signOut({ redirectTo: '/' });
};

export const GooglelogOut = async () => {
  await signOut({ redirectTo: '/' });
};
