import { FcGoogle } from 'react-icons/fc'; 
import { BsGithub } from 'react-icons/bs'; 

const page = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login Your Account
          </h2>

          {/* Social Login Buttons */}
          <div className="flex justify-around mb-4">
            <button className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
              <FcGoogle className="mr-2" />
              Google
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
              <BsGithub className="mr-2" />
              GitHub
            </button>
          </div>

          <div className="text-center text-gray-500 mb-4">Or</div>

          <form>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Eamil
              </label>
              <input
                type="text"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Email"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Password"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
