import Image from 'next/image';
import { CardContent } from '@/components/ui/card';
import { Heading } from '@/shared/HeadandPara';

interface Tutorprops {
  _id: string;
  name: string;
  email: string;
  photoUrl: string;
}

const TutorSection = async () => {
  const response = await fetch(
    `https://study-platform-backend-drxm.onrender.com/api/v1/tutor`,
    { next: { revalidate: 100 } }
  );

  const tutors = await response.json();

  return (
    <section className="py-6">
      <div className="container mx-auto px-6 text-center">
        <Heading text="Our Expert Tutors" />
        <p className="mb-10">Guiding you every step of your learning journey</p>
        {/* reduced gap-12 → gap-6 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors?.map((tutor: Tutorprops) => (
            <div
              key={tutor._id}
              className="
                rounded-xl shadow-sm 
                bg-white overflow-hidden
                transition-transform duration-300 
                transform hover:scale-105 hover:shadow-md hover:z-10
              "
            >
              <div className="relative w-full h-72 p-4">
                <Image
                  src={tutor.photoUrl}
                  alt={tutor.name}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="text-xl font-semibold">{tutor.name}</h3>
                <p className="text-sm mt-1 mb-3">{tutor.email}</p>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TutorSection;
