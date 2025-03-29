// components/Banner.js

import Image from 'next/image'; // Import Next.js Image component

const Banner = () => {
  return (
    <div className="relative bg-blue-100 min-h-screen overflow-hidden flex items-center"> {/* Full height, center content */}
      <div className="relative container mx-auto px-4 py-4">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <p className="text-blue-500 uppercase font-semibold mb-2">Popular Online Courses</p> {/* Adjust color as needed */}
            <h2 className="text-4xl font-extrabold text-gray-800 sm:text-5xl md:text-6xl mb-6">
              The New Way To <br />
              Learn Properly in <br />
              With Us!
            </h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition duration-300">
              Get Started
            </button>
          </div>

          {/* Image */}
          <div className="relative mt-12 lg:mt-0">
            <Image
              src="/front-view-smiley-man-holding-laptop.jpg"  
              alt="Young Man Learning"
              width={500}        
              height={400}       
              className="rounded-lg shadow-xl w-full h-full object-contain"  
              style={{objectFit:"contain"}}  
              layout="responsive"
              priority
            />
          </div>
        </div>

        {/* Decorative Background (optional) */}
        {/* <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-50 to-transparent opacity-20"></div> */}
      </div>
    </div>
  );
};

export default Banner;