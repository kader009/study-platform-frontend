'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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
    {
      name: 'Jenifer white',
      message:
      'I acquired hands-on skills immediately applicable to my career—highly recommend!',
      image: 'https://randomuser.me/api/portraits/women/43.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section className="py-16 px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">
          Student <span className='text-blue-600'>Testimonial</span>
        </h2>

        <div className="relative">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex justify-center mb-4">
              <Image
                width={80}
                height={80}
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="object-cover rounded-full border-2"
              />
            </div>
            <p className="text-lg text-gray-700 mb-4 italic">
              {testimonials[currentIndex].message}
            </p>
            <p className="font-semibold text-gray-900 text-lg mb-4">
              {testimonials[currentIndex].name}
            </p>

            {/* Pagination moved here under the name */}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`
                    w-3 h-3 rounded-full
                    ${idx === currentIndex ? 'bg-gray-800' : 'bg-gray-300'}
                    focus:outline-none
                  `}
                />
              ))}
            </div>
          </div>

          {/* Carousel arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg focus:outline-none"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg focus:outline-none"
          >
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
