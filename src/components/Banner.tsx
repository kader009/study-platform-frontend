'use client';

const Banner = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-black via-gray-900 to-blue-900 px-6 py-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <p className="text-blue-600 uppercase tracking-wide font-semibold mb-3">
            Empower Your Learning
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-100 leading-tight mb-6">
            Learn Smart with <span className="text-blue-600">Edunest</span>
            <br />
            Where Curiosity Meets Code
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Join live sessions, master in-demand skills, and build your tech
            career the right way — one session at a time.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
            Get Started
          </button>
        </div>

        {/* Code Snippet Section */}
        <div className="bg-gray-900 text-green-400 p-6 rounded-xl shadow-lg font-mono text-sm leading-relaxed overflow-x-auto">
          <pre>
            <code>
          {`// enroll in your first session at Edunest
        const session = {
          course: "Frontend Development",
          level: "Beginner",
          duration: "4 weeks",
          };

            const enroll = async () => {
              try {
                const res = await Edunest.enroll(session);
                console.log("Enrolled successfully!", res);
              } catch (error) {
                console.error("Enrollment failed", error);
              }
            };`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Banner;
