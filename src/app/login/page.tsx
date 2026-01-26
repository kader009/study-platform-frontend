'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import { FormEvent, useEffect, useState } from 'react';
import { useLoginMutation } from '@/redux/endApi';
import {
  SetEmail,
  SetPassword,
} from '@/redux/features/authentication/loginSlice';
import { setUser } from '@/redux/features/authentication/userSlice';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import AdminLogin from '@/shared/AdminAccess';
import SocialLogin from '@/shared/Socialogin';
import { loginSchema } from '@/validation/authSchema';

const Page = () => {
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state: RootState) => state.login);
  const error = useAppSelector((state: RootState) => state.user.error);
  const [signIn, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form data using Zod
    const validationResult = loginSchema.safeParse({
      email,
      password,
    });

    if (!validationResult.success) {
      // Collect and set validation errors
      const newErrors: { email?: string; password?: string } = {};
      validationResult.error.issues.forEach((error) => {
        const field = error.path[0] as 'email' | 'password';
        if (!newErrors[field]) {
          newErrors[field] = error.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    // Clear any previous validation errors on successful validation
    setErrors({});
    try {
      const { data } = await signIn({ email, password });

      if (data?.user && data?.token) {
        dispatch(setUser(data));
        toast.success('Welcome to Edunest Website');

        dispatch(SetEmail(''));
        dispatch(SetPassword(''));
        router.replace('/');
      } else {
        throw new Error('Invalid login response write again');
      }
    } catch (error) {
      console.error('Login error:', error);
      const message =
        (error as { message?: string; error?: string })?.message ||
        (error as { message?: string; error?: string })?.error ||
        'Invalid email or password';
      toast.error(message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login Your Account
          </h1>

          {/*  Admin Access Info */}
          <AdminLogin
            onDemoLogin={(email, password) => {
              dispatch(SetEmail(email));
              dispatch(SetPassword(password));
            }}
          />

          {/* Social Login Buttons */}
          <SocialLogin />

          <div className="text-center text-gray-500 mb-4">
            Or continue with email & password
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Email"
                value={email}
                onChange={(e) => {
                  dispatch(SetEmail(e.target.value));
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: undefined }));
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => dispatch(SetPassword(e.target.value))}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          {/* Register link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              New to here?{' '}
              <Link href="/register" className="text-blue-500 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
