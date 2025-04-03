'use client';
import Image from 'next/image';
import { CardContent } from '@/components/ui/card';
import { useAllTutorQuery } from '@/redux/endApi';

interface Tutorprops {
  _id: string;
  name: string;
  email: string;
  photoUrl: string;
}

const TutorSection = () => {
  const { data: tutors, isLoading, isError } = useAllTutorQuery([]);

  if (isLoading)
    return (
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600 flex justify-center items-center min-h-screen"></div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 text-2xl">
        {' '}
        something went wrong
      </div>
    );
  return (
    <section className="py-8">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Meet Our Expert Tutors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {tutors?.map((tutor: Tutorprops) => (
            <div
              key={tutor._id}
              className="rounded-xl shadow-lg transition-transform transform hover:scale-95 hover:shadow-xl bg-white overflow-hidden"
            >
              <div className="relative w-full h-80">
                <Image
                  src={tutor.photoUrl}
                  alt={tutor.name}
                  width={400}
                  height={500}
                  layout="cover"
                  // objectFit="cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-700">
                  {tutor.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{tutor.email}</p>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TutorSection;
