'use client';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { GooglelogIn, logIn } from '@/lib/auth';
import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import {
  SetEmail,
  SetName,
  SetPhotoUrl,
  SetPassword,
  SetRole,
} from '@/redux/features/authentication/registerSlice';
import { useSignUpMutation } from '@/redux/endApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Page = () => {
  const dispatch = useAppDispatch();
  const { name, email, photoUrl, password, role } = useAppSelector(
    (state: RootState) => state.register
  );
  const [signUp] = useSignUpMutation();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await signUp({ name, email, photoUrl, password, role });
      console.log('user data', user);
      toast.success('register successfull');
      router.replace('/login');
    } catch (error) {
      console.log(error);
      toast.error('something went wrong');
    }
  };
  
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create an Account
          </h1>

          {/* Social Login Buttons */}
          <div className="flex justify-around mb-4">
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
          </div>

          <div className="text-center text-gray-500 mb-4">Or</div>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Name"
                value={name}
                onChange={(e) => dispatch(SetName(e.target.value))}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Email"
                value={email}
                onChange={(e) => dispatch(SetEmail(e.target.value))}
              />
            </div>

            {/* Photo */}
            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Photo Url
              </label>
              <input
                type="text"
                id="photo"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Direct image URL or ImgBB URL"
                value={photoUrl}
                onChange={(e) => dispatch(SetPhotoUrl(e.target.value))}
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
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Password"
                value={password}
                onChange={(e) => dispatch(SetPassword(e.target.value))}
              />
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label
                htmlFor="role"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Role
              </label>
              <select
                id="role"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={role}
                onChange={(e) => dispatch(SetRole(e.target.value))}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="student">student</option>
                <option value="tutor">tutor</option>
                <option value="admin">admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          {/* Login link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
