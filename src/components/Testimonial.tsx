'use client'
import Image from 'next/image';
import { useState } from 'react';

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: 'John Doe',
      message:
        'EduNest has transformed the way I learn. The tutors are fantastic, and the sessions are highly interactive!',
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    {
      name: 'Jane Smith',
      message:
        'I gained practical skills that I could apply directly to my career. Highly recommended!',
      image: 'https://randomuser.me/api/portraits/men/43.jpg',
    },
    {
      name: 'David Lee',
      message:
        'The platform is easy to use, and the sessions are very well organized. It’s been an amazing experience.',
      image: 'https://randomuser.me/api/portraits/men/36.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">
          What Our Students Say
        </h2>

        <div className="relative">
          {/* Testimonial Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex justify-center mb-4">
              <Image
              width={40}
              height={40}
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 object-cover rounded-full border-2"
              />
            </div>
            <p className="text-lg text-gray-700 mb-4 italic">
              {testimonials[currentIndex].message}
            </p>
            <p className="font-semibold text-gray-900 text-lg">
              {testimonials[currentIndex].name}
            </p>
          </div>

          {/* Carousel Navigation */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2">
            <button
              onClick={prevSlide}
              className="bg-black text-white p-2 rounded-full shadow-lg focus:outline-none"
            >
              &#10094;
            </button>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
            <button
              onClick={nextSlide}
              className="bg-black text-white p-2 rounded-full shadow-lg focus:outline-none"
            >
              &#10095;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
