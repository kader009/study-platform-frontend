import Image from 'next/image';

const AboutUs = () => {
  return (
    <section className="flex flex-col lg:flex-row-reverse items-center justify-between px-8 md:px-24 py-24 min-h-150">
      {/* Right Side - Text Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-3 order-2 lg:order-1">
        <h1 className="text-blue-600 font-bold text-xl tracking-wide uppercase">
          About Us
        </h1>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
          Shaping the Future of <br /> Learning & Innovation
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At{' '}
          <span className="font-semibold text-blue-600 typing-animation">
            EduNest
          </span>
          , we believe that education should be engaging, accessible, and
          transformative. Our platform is dedicated to providing cutting-edge
          learning experiences that empower students to reach their full
          potential.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          With a wide range of courses, expert instructors, and an interactive
          learning environment, we bridge the gap between traditional education
          and modern technology. Join us in shaping a smarter future.
        </p>
      </div>

      {/* Left Side - Image */}
      <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0">
        <div className="relative w-full max-w-125 aspect-4/3">
          <Image
            src="/student4.webp"
            alt="Happy student"
            fill
            loading="lazy"
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
