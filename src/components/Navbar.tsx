'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 py-3 px-5">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Mobile Hamburger Icon */}
        <div className="flex items-center">
          <Link href="/" className="text-white text-xl font-bold mr-4">
            EduNest
          </Link>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none md:hidden"  // Hide on medium and up
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
              className="block mt-4 md:inline-block md:mt-0 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/register"
              className="block mt-4 md:inline-block md:mt-0 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="block mt-4 md:inline-block md:mt-0 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
            >
              Login
            </Link>
            <Link
              href="/logout"
              className="block mt-4 md:inline-block md:mt-0 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
            >
              Logout
            </Link>

            {/* Profile Image (Dummy) */}
            <div className="ml-4">
              <Image
                src="/profile.jpg" // Path to your dummy profile image
                alt="Profile"
                width={32}
                height={32}
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