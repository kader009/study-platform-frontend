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
    <div>
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Approved Sessions</h2>
        <p className="text-gray-500 mb-4">Everyone can view the cards</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.slice(0, 6).map((session:SessionProps) => (
            <div
              key={session._id}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                {session.sessionTitle}
              </h3>
              <p className="text-gray-700 mb-4">{session.sessionDescription}</p>
              <div className="flex justify-between items-center">
                
                <Link href={`/session/${session._id}`}>
                  <span className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                    Read More
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/all-sessions">
            <span className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
              View All Sessions
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SessionData;
