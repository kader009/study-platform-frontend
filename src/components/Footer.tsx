import Link from 'next/link';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className=" bg-black text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Edunest */}
        <div className="space-y-4">
          <Link href="/">
            <h1 className="text-3xl font-extrabold text-white">Edunest</h1>
          </Link>
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
          <form className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email..."
              className="w-full sm:flex-1 px-4 py-2 rounded focus:outline-none border border-gray-700"
              required
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            123 Learning Way, Dhaka, Bangladesh
          </p>
          <p className="text-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>{' '}
            <li className="hover:underline list-none">support@edunest.com</li>
          </p>
          <p className="text-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <li className="hover:underline list-none">+880 1234-567890</li>
          </p>

          <div className="flex space-x-4 mt-2 cursor-pointer">
            <li className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition list-none hover:transition-y-[-6px]">
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
        <p>
          © {new Date().getFullYear().toString()} Edunest. All rights reserved.
        </p>
        <p>Built with ❤️ by Md Abdul Kader Molla</p>
      </div>
    </footer>
  );
}

export default Footer;
