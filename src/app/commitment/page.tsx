import React from 'react';
import { whyChooseData } from '@/data/whyChoose';
import { StudentReview } from '@/data/studentReview';

const Commitment = () => {
  return (
    <main className="flex-1">
      <div className="relative bg-linear-to-br from-black via-gray-900 to-blue-900 py-20 md:py-32 overflow-hidden">
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
              {whyChooseData.map((item, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-xl border border-gray-200 bg-white hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
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
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 md:mb-12">
              What Our Students Say
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {StudentReview.map((student, index) => (
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
                      <p className="text-gray-700 mb-4">
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your Learning Journey?
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of learners who have chosen Edunest to achieve
              their personal and professional goals.
            </p>
            <button className="bg-black text-white font-semibold px-4 py-3 rounded-full text-md hover:shadow-sm transition-all hover:scale-105">
              Join Today
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Commitment;
