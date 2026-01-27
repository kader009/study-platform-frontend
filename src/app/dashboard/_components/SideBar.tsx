'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import { logout } from '@/redux/features/authentication/userSlice';
import { toast } from 'sonner';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

const links = [
  {
    href: '/dashboard/student/booked-session',
    label: 'Booked Session',
    roles: ['student'],
  },
  {
    href: '/dashboard/student/create-note',
    label: 'Create Note',
    roles: ['student'],
  },
  {
    href: '/dashboard/student/manage-note',
    label: 'Manage Note',
    roles: ['student'],
  },
  {
    href: '/dashboard/student/study-material',
    label: 'Study Material',
    roles: ['student'],
  },
  { href: '/dashboard/admin/all-user', label: 'All User', roles: ['admin'] },
  {
    href: '/dashboard/admin/all-session',
    label: 'All Session',
    roles: ['admin'],
  },
  {
    href: '/dashboard/admin/all-material',
    label: 'All Material',
    roles: ['admin'],
  },
  {
    href: '/dashboard/admin/profile',
    label: 'Profile',
    roles: ['admin'],
  },
  {
    href: '/dashboard/tutor/create-session',
    label: 'Create Session',
    roles: ['tutor'],
  },
  {
    href: '/dashboard/tutor/view-all-session',
    label: 'View Session',
    roles: ['tutor'],
  },
  {
    href: '/dashboard/tutor/upload-material',
    label: 'Upload Material',
    roles: ['tutor'],
  },
  {
    href: '/dashboard/tutor/view-all-material',
    label: 'View Material',
    roles: ['tutor'],
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const role = useAppSelector((state) =>
    state.user.token ? state.user.user?.role : null,
  );

  const filterLinks = links.filter((link) => role && link.roles.includes(role));
  const defaultImage =
    'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg';

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
    toast.success('Logout successfully');
  };

  // Automatically close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-1/2 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-black text-white p-4 w-48 transition-transform duration-300 z-40 flex flex-col overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-64'
        } md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-4 shrink-0">Dashboard</h1>
        <ul className="space-y-2 flex-1 overflow-y-auto">
          {filterLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Profile Section */}
        <div className="border-t border-gray-700 pt-4 mt-4 space-y-3">
          {/* User Image */}
          <div className="flex justify-center">
            <div className="w-15 h-15 rounded-full overflow-hidden">
              <Image
                src={user?.photoUrl || defaultImage}
                alt={user?.name || 'User'}
                width={60}
                height={60}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Back to Home Button */}
          <Link
            href="/"
            className="w-full py-2 px-4 rounded-full text-sm font-semibold transition flex items-center justify-center gap-2 hover:bg-gray-700 cursor-pointer"
          >
            <FaHome className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 rounded-full text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-700"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
