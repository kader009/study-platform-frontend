'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import { logout } from '@/redux/features/authentication/userSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
    toast.success('Logout successfully');
    setIsOpen(false);
  };

  const defaultImage =
    'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg';

  return (
    <>
      <nav className="bg-white py-3 px-6 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-black text-xl font-bold">
            EduNest
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-black hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/session"
                  className="text-black hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                >
                  All Session
                </Link>
                <Link
                  href="/whychoseus"
                  className="text-black hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                >
                  Commitment
                </Link>
                <Link
                  href="/contact"
                  className="text-black hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                >
                  Contact
                </Link>
                <button
                  className="text-black hover:bg-blue-600 hover:text-white px-4 py-2 rounded font-medium transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <Image
                  src={user.photoUrl || defaultImage}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover h-10 w-10"
                />
              </>
            ) : (
              <Link
                href="/login"
                className="text-white bg-black hover:bg-gray-800 px-5 py-2 rounded font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-black">EduNest</h2>
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <XMarkIcon className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {user ? (
              <div className="flex flex-col space-y-4">
                {/* Profile Section */}
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Image
                    src={user.photoUrl || defaultImage}
                    alt="Profile"
                    width={50}
                    height={50}
                    className="rounded-full object-cover w-10 h-10"
                  />
                  <div>
                    <p className="font-semibold text-black">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                {/* Navigation Links */}
                <Link
                  href="/dashboard"
                  onClick={toggleMenu}
                  className="block text-black hover:bg-blue-50 hover:text-blue-600 px-3 py-3 rounded-lg font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/session"
                  onClick={toggleMenu}
                  className="block text-black hover:bg-blue-50 hover:text-blue-600 px-3 py-3 rounded-lg font-medium transition-colors"
                >
                  All Session
                </Link>
                <Link
                  href="/whychoseus"
                  onClick={toggleMenu}
                  className="block text-black hover:bg-blue-50 hover:text-blue-600 px-3 py-3 rounded-lg font-medium transition-colors"
                >
                  Commitment
                </Link>
                <Link
                  href="/contact"
                  onClick={toggleMenu}
                  className="block text-black hover:bg-blue-50 hover:text-blue-600 px-3 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 px-2 py-2 rounded-full font-medium transition-colors text-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={toggleMenu}
                className="block text-white bg-black hover:bg-gray-800 px-4 py-3 rounded-lg font-medium text-center transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
