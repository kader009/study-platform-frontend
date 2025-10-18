import React from 'react';
import {
  AcademicCapIcon,
  ArrowPathIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  DevicePhoneMobileIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

const WhyChooseUs = () => {
  return (
    <main className="flex-1">
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              The Smarter Way to Learn
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Experience a personalized and engaging learning journey with
              Edunest, designed to help you achieve your personal and
              professional goals.
            </p>
          </div>
        </div>
        {/* Curved Bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-12 md:h-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,100 350,100 600,50 C850,0 1050,0 1200,50 L1200,120 L0,120 Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Edunest?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We are committed to providing a high-quality, flexible, and
                supportive learning environment to help you achieve your goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  Icon: AcademicCapIcon,
                  title: 'Expert-Led Courses',
                  desc: 'Learn from industry leaders and experienced educators.',
                },
                {
                  Icon: ArrowPathIcon,
                  title: 'Personalized Learning Paths',
                  desc: 'Tailor your learning journey to your specific needs and pace.',
                },
                {
                  Icon: RocketLaunchIcon,
                  title: 'Interactive & Engaging Content',
                  desc: 'Immerse yourself in dynamic lessons, quizzes, and projects.',
                },
                {
                  Icon: UserGroupIcon,
                  title: 'Community & Collaboration',
                  desc: 'Connect with peers, mentors, and instructors in a vibrant community.',
                },
                {
                  Icon: DevicePhoneMobileIcon,
                  title: 'Flexible & Accessible',
                  desc: 'Access your courses anytime, anywhere, on any device.',
                },
                {
                  Icon: BriefcaseIcon,
                  title: 'Career-Focused Outcomes',
                  desc: 'Gain practical skills and knowledge to advance your career.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-xl border border-gray-200 bg-white hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors flex-shrink-0">
                      <item.Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 md:mb-12">
              What Our Students Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah J.',
                  title: 'Software Engineer',
                  quote:
                    'Edunest transformed my career. The courses are top-notch and the instructors are amazing!',
                  image:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDH7JtdEmbdrs4p_qaFflw_d7YpN1hRTY9DkzZ20nmnd5d6N-AsStC1EgYMfxrl6fR6A0y8F0_p8d_Cslc9rqANwb-Ds9BFCrbgMyr0TL6OQlgwV6Pdm1ftLBC77v0ZnWt4sr1hFFQsQIOKrLmprvahibjlnwJLtAC8uMYLjwg4f2jehnpzkal9woD7gCzub79RlegRL6b4a6PR37_ZHxJzl_2sGvpIE7lywxbG17Bj8dy_459ls8fLxplHB_kHVhiOmiKMhX81Iw',
                },
                {
                  name: 'David L.',
                  title: 'Marketing Manager',
                  quote:
                    "The best platform for continuous learning. I've been able to upskill and stay relevant in my field.",
                  image:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDGK0U_8irmpjC_O-bjE1NrsInMzKQgCgxLKGa0_67vGSVfw25u8fjomVihOFF79bSeM4L6ddSJOWtgjcHSMstUI6W2YtJ-g8jPuUb4Efl9yl3izd5vZIcdXw-KJgbSrCdVBS9YPT47O5idmcBYkwWzCPwAtltxsYHj1YV5Y5KDJBQF_xMFTyF3Tmh7nW4gmJiRd_7jsNtor_Pj0uIfrh_7CZkX1xRjz6A5ud0oXb_7mp5SjS2s5L1Xfv5d2F6Xg316JTBieFzUMA',
                },
                {
                  name: 'Emily R.',
                  title: 'Student',
                  quote:
                    'A truly collaborative and supportive community. I never felt alone in my learning journey.',
                  image:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBgJqtkiSmQVwCOSl70RG4XdmhXkATEfDCDruS0RJOrhHgQv2bP2DdyPIgtYvgcyGntqe5NWXR7E4Wa_HJ_N7k5vGPFY3XJPCMBc3BBcnjSrG_QfO7WLxyZ03Tk5uw-t4-qqck3vfNT3Q9oLKUjUun1dWomJtr6uYKnz13cUVmWMNrVp9W3q5yX0ikDSX3Ua7QLoRO4uWatiA_RnpLu-nvYwo5w99PbL8M13isEoXoyNqIrslSeT-1MFYTEi2wNkQTrsaroPvU05w',
                },
              ].map((student, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div
                      className="w-20 h-20 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${student.image})` }}
                    ></div>
                    <div>
                      <p className="text-gray-700 italic mb-4">
                        &ldquo;{student.quote}&rdquo;
                      </p>
                      <p className="font-bold text-blue-600">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Clean Design */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of learners who have chosen Edunest to achieve
              their personal and professional goals.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-4 py-4 rounded-full text-lg hover:shadow-xl transition-all hover:scale-105">
              Join Edunest Today
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WhyChooseUs;
