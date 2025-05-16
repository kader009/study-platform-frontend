'use client';
import { useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className=" bg-black text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Edunest */}
        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold text-white">About Edunest</h1>
          <p className="text-sm leading-relaxed">
            Empowering learners with live interactive sessions & cutting-edge
            tech. Join our community of curious minds.
          </p>
        </div>

        {/* Explore Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Explore</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-gray-400 transition cursor-default">
              Why Choose Us?
            </li>
            <li className="hover:text-gray-400 transition cursor-default">
              How It Works
            </li>
            <li className="hover:text-gray-400 transition cursor-default">
              Benefits of Joining
            </li>
            <li className="hover:text-gray-400 transition cursor-default">
              Top Features
            </li>
            <li className="hover:text-gray-400 transition cursor-default">
              Our Vision
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Newsletter</h3>
          <p className="text-sm">
            Subscribe for updates, offers, and news directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full sm:flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Contact Info & Social */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-white">Get in Touch</h4>
          <p className="text-sm flex items-center gap-2">
            📍 123 Learning Way, Dhaka, Bangladesh
          </p>
          <p className="text-sm flex items-center gap-2">
            📧{' '}
            <li className="hover:underline list-none">support@edunest.com</li>
          </p>
          <p className="text-sm flex items-center gap-2">
            📞 <li className="hover:underline list-none">+880 1234-567890</li>
          </p>

          <div className="flex space-x-4 mt-2">
            <li className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition list-none">
              <FaFacebookF />
            </li>
            <li className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition list-none">
              <FaTwitter />
            </li>
            <li className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition list-none">
              <FaInstagram />
            </li>
            <li className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 transition list-none">
              <FaLinkedinIn />
            </li>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-12" />

      {/* Footer Bottom */}
      <div className="container mx-auto px-6 text-center text-sm text-gray-400 space-y-2">
        <p>© {year} Edunest. All rights reserved.</p>
        <p>Built with ❤️ by Md Abdul Kader Molla</p>
      </div>
    </footer>
  );
}

export default Footer;
