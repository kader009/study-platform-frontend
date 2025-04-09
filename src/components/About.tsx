import Image from 'next/image';

const AboutUs = () => {
  return (
    <section className="flex flex-col md:flex-row-reverse items-center justify-between px-8 md:px-24 py-24  min-h-[600px]">
      {/* Right Side - Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h3 className="text-orange-600 font-semibold text-xl tracking-wide uppercase">
          About Us
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
          Shaping the Future of <br /> Learning & Innovation
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At <span className="font-semibold text-orange-500">EduNest</span>, we believe that education should be 
          engaging, accessible, and transformative. Our platform is dedicated to providing 
          cutting-edge learning experiences that empower students to reach their full potential.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          With a wide range of courses, expert instructors, and an interactive learning 
          environment, we bridge the gap between traditional education and modern technology. 
          Join us in shaping a smarter future.
        </p>
      </div>

      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="relative w-[400px] h-[300px] md:w-[550px] md:h-[400px]">
          <Image
            src="/student3.png"
            alt="Happy student"
            layout="fill"
            loading='lazy'
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
