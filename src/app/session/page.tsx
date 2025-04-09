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

const page = async () => {
  const data = await fetch('http://localhost:5000/api/v1/session');
  const sessions = await data.json();
  return (
    <div>
      <div className="container mx-auto py-16 px-8">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          {' '}
          <span className="text-blue-600">Approved</span> Sessions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session: SessionProps) => {
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
                    <span className="bg-slate-800 text-white text-sm font-semibold py-2 px-4 rounded-full">
                      Closed
                    </span>
                  ) : (
                    <span className="bg-slate-800 text-white text-xs font-semibold py-2 px-4 rounded-full">
                      Open
                    </span>
                  )}

                  <Link href={`/session/${session._id}`}>
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold py-2 px-5 rounded-full transition-all shadow-md hover:from-blue-600 hover:to-indigo-700">
                      Read More
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
