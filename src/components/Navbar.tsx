'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import { logout } from '@/redux/features/authentication/userSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
    toast.success('logout successfully')
  };

  return (
    <nav className="bg-white py-3 px-5 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Mobile Hamburger Icon */}
        <div className="flex items-center">
          <Link href="/" className="text-black text-xl font-bold mr-4">
            EduNest
          </Link>
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none md:hidden" // Hide on medium and up
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          }  md:flex md:items-center w-full md:w-auto`}
        >
          <div className="text-sm md:flex md:items-center md:space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block mt-4 md:inline-block md:mt-0 text-black  px-3 py-2 rounded-md font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/session"
                  className="block mt-4 md:inline-block md:mt-0 text-black  px-3 py-2 rounded-md font-medium"
                >
                  All Session
                </Link>

                <button
                  className="block mt-4 md:inline-block md:mt-0 text-black hover:bg-blue-600 hover:text-white px-3 py-2 rounded font-medium cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>

                {/* Profile Image (Dummy) */}
                <div className="ml-4">
                  <Image
                    src={
                      'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'
                    }
                    alt="Profile"
                    width={40}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="block mt-4 md:inline-block md:mt-0 text-black hover:bg-blue-600 hover:text-white px-3 py-2 rounded font-medium cursor-pointer"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="block mt-4 md:inline-block md:mt-0 text-black hover:bg-blue-600 hover:text-white px-3 py-2 rounded font-medium cursor-pointer"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
