'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/features/authentication/userSlice';
import { toast } from 'sonner';

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'authenticated' && session?.user) {
      // Save user data to Redux store
      const userData = {
        user: {
          _id: session.user.id || '',
          name: session.user.name || '',
          email: session.user.email || '',
          photoUrl: session.user.image || '',
          role: session.user.role || 'student',
        },
        token: session.user.accessToken || '',
      };

      dispatch(setUser(userData));
      toast.success('Welcome to Edunest Website');

      // Redirect to home page
      router.replace('/');
    } else if (status === 'unauthenticated') {
      toast.error('Authentication failed');
      router.replace('/login');
    }
  }, [session, status, dispatch, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}
