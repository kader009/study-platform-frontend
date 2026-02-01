import { testimonials } from '@/data/testimonialData';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialCarousel = () => {
  return (
    <section className="py-10 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-extrabold mb-3">What Our Users Say</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Hear from professionals who have elevated their skills with{' '}
          <span className="font-bold text-blue-400">EduNest</span>
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative bg-white/60 backdrop-blur-lg border border-gray-200 rounded-2xl shadow p-6 hover:shadow-2xl transition-shadow duration-300 group"
          >
            {/* Floating Quote Icon */}
            <FaQuoteLeft className="text-blue-400 text-3xl mb-4 group-hover:scale-105 transition-transform duration-300" />

            <blockquote className="text-gray-700 mb-6 text-sm leading-relaxed">
              {testimonial.message}
            </blockquote>

            <div className="border-t border-gray-300 pt-4">
              <p className="text-base font-semibold text-gray-800">
                {testimonial.name}
              </p>
              <p className="text-sm text-blue-500">{testimonial.role}</p>
            </div>

            {/* Gradient border glow on hover */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400 transition duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialCarousel;
