'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="fixed top-1/2 left-4 transform -translate-y-1/2 z-50 bg-gray-900 text-white p-2 rounded-lg md:hidden"
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
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-4 w-64 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-64'
        } md:relative md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/students"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Students
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/courses"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Courses
            </Link>
          </li>
        </ul>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
