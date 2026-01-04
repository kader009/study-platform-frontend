import { SessionProps } from '@/types/sesstionType';
import Link from 'next/link';

const SessionData = async () => {
  const data = await fetch(
    'https://study-platform-backend-drxm.onrender.com/api/v1/session/approved'
  );

  const sessions = await data.json();

  return (
    <div className="container mx-auto py-8 px-6">
      <h1 className="text-3xl font-semibold mb-2 text-center">
        <span className="text-blue-600">Learning</span> Sessions
      </h1>
      <p className="text-center mb-8 text-gray-600">
        Discover expertly curated sessions designed to accelerate your learning
        journey
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions?.slice(0, 6).map((session: SessionProps) => {
          const currentTime = new Date();
          const sessionEndTime = new Date(session?.classEndDate);
          const isSessionEnded = currentTime > sessionEndTime;

          return (
            <div
              key={session?._id}
              className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
            >
              <div className="mt-2 mb-3">
                {isSessionEnded ? (
                  <span className="bg-red-200 text-red-400 text-sm font-semibold py-2 px-4 rounded-full">
                    Closed
                  </span>
                ) : (
                  <span className="bg-green-200 text-green-400 text-xs font-semibold py-2 px-4 rounded-full">
                    Open
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-blue-600 mb-3 truncate">
                {session?.sessionTitle}
              </h3>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {session?.sessionDescription}
              </p>
              <div className="flex justify-end items-center">
                <Link href={`/session/${session._id}`}>
                  <span className="bg-linear-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold py-2 px-5 rounded-full transition-all shadow-md hover:from-blue-600 hover:to-indigo-700">
                    Read More
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 text-center">
        <Link href="/session">
          <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-full transition duration-300">
            View All Sessions
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SessionData;
