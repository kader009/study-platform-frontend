'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString()); // Fix hydration issue
  }, []);
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">About Us</h4>
            <p className="text-sm">
              We are a passionate team dedicated to providing high-quality
              services and solutions to our clients. Learn more about our
              mission and values.
            </p>
            <Link href="/about" className="text-blue-400 hover:text-blue-300">
              Read More
            </Link>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
            <ul className="text-sm">
              <li className="mb-2">
                <Link href="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/services" className="hover:text-gray-400">
                  Services
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="hover:text-gray-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-400">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">
              Contact Information
            </h4>
            <p className="text-sm">123 Main Street, Anytown, CA 12345</p>
            <p className="text-sm">Email: info@example.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        <div className="text-center text-sm">
          © {year} My Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;