'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';

const Navbar = () => {
  const { user, error, loading } = useAppSelector(
    (state: RootState) => state.user
  );
  
  let storedUser = null;
  
  if (typeof window !== 'undefined') {
    const localUser = localStorage.getItem('user');
    try {
      storedUser =
        localUser && localUser !== 'undefined' ? JSON.parse(localUser) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem('user'); // Optional: clean up bad value
    }
  }
  
  const displayUser = user || storedUser;
  
  console.log(displayUser);
  console.log(user, error, loading);
  console.log(typeof window !== 'undefined' ? localStorage.getItem('user') : null);
  

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
            <Link
              href="/dashboard"
              className="block mt-4 md:inline-block md:mt-0 text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/session"
              className="block mt-4 md:inline-block md:mt-0 text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
            >
              All Session
            </Link>
            <Link
              href="/register"
              className="block mt-4 md:inline-block md:mt-0 text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="block mt-4 md:inline-block md:mt-0 text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
            >
              Login
            </Link>
            <Link
              href="/logout"
              className="block mt-4 md:inline-block md:mt-0 text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
            >
              Logout
            </Link>

            {/* Profile Image (Dummy) */}
            <div className="ml-4">
              <Image
                src={
                  displayUser?.photoUrl ||
                  'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'
                }
                alt="Profile"
                width={50}
                height={70}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
