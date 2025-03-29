import Link from 'next/link';

interface SessionProps {
  _id: string;
  sessionTitle: string;
  tutorName: string;
  averageRating: number;
  sessionDescription: string;
  registrationStartDate: string;
  registrationEndDate: string;
  classStartTime: string;
  classEndDate: string;
  sessionDuration: string;
}

const SessionData = async () => {
  const data = await fetch('http://localhost:5000/api/v1/session');
  const sessions = await data.json();

  return (
    <div className="container mx-auto py-16 px-8">
      <h2 className="text-3xl font-semibold mb-8 text-center"> <span className='text-blue-600'>Approved</span> Sessions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.slice(0, 6).map((session: SessionProps) => {
          const currentTime = new Date();
          const sessionEndTime = new Date(session.classEndDate);
          const isSessionEnded = currentTime > sessionEndTime;

          return (
            <div
              key={session._id}
              className="bg-white rounded-lg shadow-md p-4 transition transform hover:scale-95"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                {session.sessionTitle}
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                {session.sessionDescription}
              </p>
              <div className="flex justify-between items-center">
                {isSessionEnded ? (
                  <span className="bg-gray-500 text-white text-sm font-semibold py-1 px-3 rounded">
                    Closed
                  </span>
                ) : (
                  <span className="bg-green-500 text-white text-sm font-semibold py-1 px-3 rounded">
                    Open
                  </span>
                )}

                <Link href={`/session/${session._id}`}>
                  <span className="bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold py-1.5 px-4 rounded transition duration-300">
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
          <span className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-2 px-6 rounded-md transition duration-300">
            View All Sessions
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SessionData;
