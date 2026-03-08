'use client';
import { FormEvent, useState } from 'react';
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
import { Eye, EyeOff } from 'lucide-react';
import SocialLogin from '@/shared/Socialogin';
import { registerSchema } from '@/validation/authSchema';

const Page = () => {
  const dispatch = useAppDispatch();
  const { name, email, photoUrl, password, role } = useAppSelector(
    (state: RootState) => state.register,
  );
  const [signUp] = useSignUpMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    photoUrl?: string;
    role?: string;
  }>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form data using Zod
    const validationResult = registerSchema.safeParse({
      name,
      email,
      password,
      photoUrl,
      role,
    });

    if (!validationResult.success) {
      // Collect and set validation errors
      const newErrors: {
        name?: string;
        email?: string;
        password?: string;
        photoUrl?: string;
        role?: string;
      } = {};
      validationResult.error.issues.forEach((error) => {
        const field = error.path[0] as
          | 'name'
          | 'email'
          | 'password'
          | 'photoUrl'
          | 'role';
        if (!newErrors[field]) {
          newErrors[field] = error.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    // Clear previous validation errors on successful validation
    setErrors({});

    try {
      const user = await signUp({ name, email, photoUrl, password, role });
      console.log('user data', user);
      toast.success('register successfull');
      router.replace('/login');

      dispatch(SetName(''));
      dispatch(SetEmail(''));
      dispatch(SetPhotoUrl(''));
      dispatch(SetPassword(''));
      dispatch(SetRole(''));
    } catch (error) {
      console.log(error);
      toast.error('something went wrong');
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen my-8">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create an Account
          </h1>

          {/* Social Login Buttons */}
          <SocialLogin />

          <div className="text-center text-gray-500 mb-4">
            Or continue with email
          </div>

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
                onChange={(e) => {
                  dispatch(SetName(e.target.value));
                  if (errors.name)
                    setErrors((prev) => ({ ...prev, name: undefined }));
                }}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
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
                onChange={(e) => {
                  dispatch(SetPhotoUrl(e.target.value));
                  if (errors.photoUrl)
                    setErrors((prev) => ({ ...prev, photoUrl: undefined }));
                }}
              />
              {errors.photoUrl && (
                <p className="text-red-500 text-xs mt-1">{errors.photoUrl}</p>
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
                onChange={(e) => {
                  dispatch(SetRole(e.target.value));
                  if (errors.role)
                    setErrors((prev) => ({ ...prev, role: undefined }));
                }}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="student">student</option>
                <option value="tutor">tutor</option>
                <option value="admin">admin</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
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
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
