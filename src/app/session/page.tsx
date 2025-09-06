'use client';

import DynamicTitle from '@/components/DynamicTitle';
import SessionSkeleton from '@/components/SessionSkeleton';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

const Page = () => {
  const [sessions, setSession] = useState<SessionProps[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 7;

  const totalPage = Math.ceil(sessions.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedSession = sessions.slice(startIndex, startIndex + limit);

  useEffect(() => {
    const fetchSessions = async (retry = 1) => {
      try {
        setIsLoading(true);
        const res = await fetch(
          'https://study-platform-backend-drxm.onrender.com/api/v1/session'
        );

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Not a valid JSON (cold start?)');
        }

        const data = await res.json();
        setSession(data);
      } catch (err) {
        if (retry < 3) {
          console.warn(`Retrying (${retry})...`);

          setTimeout(() => fetchSessions(retry + 1), 2000);
        } else {
          console.error('Session fetch failed after 3 retries:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div>
      <DynamicTitle />
      <div className="container mx-auto py-16 px-6">
        <h1 className="text-3xl font-semibold mb-2 text-center">
          <span className="text-blue-600">Learning</span> Sessions
        </h1>
        <p className="text-center mb-8">
          Browse sessions that are reviewed and officially approved
        </p>

        {/* Spinner While Loading */}
        {isLoading ? (
          <SessionSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedSession.map((session: SessionProps) => {
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

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-10 space-x-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>
              <span className="text-lg font-semibold text-blue-600">
                Page {page} of {totalPage}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
                disabled={page === totalPage}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
