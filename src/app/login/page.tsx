'use client';
// import { FcGoogle } from 'react-icons/fc';
// import { BsGithub } from 'react-icons/bs';
// import { GooglelogIn, logIn } from '@/lib/auth';
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

const Page = () => {
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state: RootState) => state.login);
  const error = useAppSelector((state: RootState) => state.user.error);
  const [signIn, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
          <div className="text-center text-sm text-gray-600 mb-6">
            <p className="font-semibold text-gray-700 mb-2">
              Admin Demo Access
            </p>

            <div className="flex justify-center items-center space-x-2 mb-1">
              <span>
                Email: <span className="text-blue-600">kader@gmail.com</span>
              </span>
              <button
                onClick={() => navigator.clipboard.writeText('kader@gmail.com')}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded"
              >
                Copy
              </button>
            </div>

            <div className="flex justify-center items-center space-x-2">
              <span>
                Password: <span className="text-blue-600">78757278</span>
              </span>
              <button
                onClick={() => navigator.clipboard.writeText('78757278')}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Social Login Buttons */}
          {/* <div className="flex justify-around mb-4">
            <button
              className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              onClick={() => GooglelogIn()}
            >
              <FcGoogle className="mr-2" />
              Google
            </button>
            <button
              className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              onClick={() => logIn()}
            >
              <BsGithub className="mr-2" />
              GitHub
            </button>
          </div> */}

          <div className="text-center text-gray-500 mb-4">Or</div>

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
                onChange={(e) => dispatch(SetEmail(e.target.value))}
              />
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
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
