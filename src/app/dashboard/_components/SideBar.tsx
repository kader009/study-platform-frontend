'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const links = [
  { href: '/dashboard/student/booked-session', label: 'Booked Session' },
  { href: '/dashboard/student/create-note', label: 'Create Note' },
  { href: '/dashboard/student/manage-note', label: 'Manage Note' },
  { href: '/dashboard/student/study-material', label: 'Study Material' },
  { href: '/dashboard/admin/all-user', label: 'All User' },
  { href: '/dashboard/admin/all-session', label: 'All Session' },
  { href: '/dashboard/admin/all-material', label: 'All Material' },
  { href: '/dashboard/tutor/create-session', label: 'Create Session' },
  { href: '/dashboard/tutor/view-all-session', label: 'View Session' },
  { href: '/dashboard/tutor/upload-material', label: 'Upload Material' },
  { href: '/dashboard/tutor/view-all-material', label: 'View Material' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        className={`fixed top-0 left-0 h-full bg-black text-white p-4 w-48 transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-64'
        } md:relative md:translate-x-0 md:h-auto`}
      >
        <h2 className="text-2xl font-bold mb-4">
          <Link href={'/'}>Dashboard</Link> 
        </h2>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul> 
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
