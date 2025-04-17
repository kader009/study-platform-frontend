'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Edunest */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4">About Edunest</h4>
          <p className="text-sm leading-relaxed">
            Edunest is a learning platform built for curious minds. Our mission is to provide accessible, high-quality education through interactive live sessions and modern tech.
          </p>
          <Link href="/about" className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium">
            Learn More →
          </Link>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="" className="hover:text-gray-400">
                Courses
              </Link>
            </li>
            <li>
              <Link href="" className="hover:text-gray-400">
                Instructors
              </Link>
            </li>
            <li>
              <Link href="" className="hover:text-gray-400">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className='space-y-3'>
          <h4 className="text-xl font-bold text-white mb-4">Get in Touch</h4>
          <p className="text-sm">📍 123 Learning Way, Dhaka, Bangladesh</p>
          <p className="text-sm">📧 support@edunest.com</p>
          <p className="text-sm">📞 +880 1234-567890</p>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />

      {/* Footer bottom */}
      <div className="text-center text-sm text-gray-400">
        <p>© {year} Edunest. All rights reserved.</p>
        <p className="mt-2 text-gray-500">Built with ❤️ by Md Abdul Kader Molla</p>
      </div>
    </footer>
  );
}

export default Footer;
