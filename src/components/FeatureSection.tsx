const features = [
  {
    title: 'Live Classes',
    description: 'Interactive real-time classes where you can ask questions directly.',
    icon: (
      <svg
        className="w-10 h-10 text-blue-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m0-4v4m0-4L9 10m6 4l-6-2"></path>
        <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
      </svg>
    ),
  },
  {
    title: 'Certificate',
    description: 'Get verified certificates upon successful course completion.',
    icon: (
      <svg
        className="w-10 h-10 text-blue-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M9 12l2 2 4-4"></path>
        <path d="M21 12c0 4.418-3.582 8-8 8H8l-4 4V4h13a1 1 0 011 1v7z"></path>
      </svg>
    ),
  },
  {
    title: 'Course Tracking',
    description: 'Easily track your progress and completed lessons.',
    icon: (
      <svg
        className="w-10 h-10 text-blue-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M3 3h18v18H3z"></path>
        <path d="M9 3v18"></path>
        <path d="M3 9h18"></path>
      </svg>
    ),
  },
  {
    title: 'Video Recordings',
    description: 'Access class recordings anytime for revision.',
    icon: (
      <svg
        className="w-10 h-10 text-blue-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m0-4v4m0-4L9 10m6 4l-6-2"></path>
        <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
      </svg>
    ),
  },
  {
    title: 'Quiz & Exams',
    description: 'Take quizzes and exams to assess your learning after each module.',
    icon: (
      <svg
        className="w-10 h-10 text-blue-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 20h9"></path>
        <path d="M12 4h9"></path>
        <path d="M3 10h9"></path>
        <path d="M3 14h9"></path>
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Platform Features
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our platform is packed with modern and interactive tools to make your learning experience smooth, efficient, and enjoyable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
