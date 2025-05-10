const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Software Engineer',
      message:
        'EduNest has transformed the way I learn. The tutors are fantastic, and the sessions are highly interactive!',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Product Manager',
      message:
        'I gained practical skills that I could apply directly to my career. Highly recommended!',
    },
    {
      id: 3,
      name: 'David Lee',
      role: 'UI/UX Designer',
      message:
        'The platform is easy to use, and the sessions are very well organized. It’s been an amazing experience.',
    },
    {
      id: 4,
      name: 'Jennifer White',
      role: 'Data Analyst',
      message:
        'I acquired hands-on skills immediately applicable to my career—highly recommend!',
    },
  ];

  return (
    <section className=" py-12 px-4">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">What Our Users Say</h1>
        <p className="mt-2 text-gray-600">
          Hear from professionals who have elevated their skills with EduNest.
        </p>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow"
          >
            <blockquote className="text-gray-700 italic mb-4">
              “{t.message}”
            </blockquote>
            <div>
              <p className="text-lg font-semibold text-gray-900">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialCarousel;
