'use client';

import DynamicTitle from '@/components/DynamicTitle';
import SessionSkeleton from '@/components/skeleton/SessionSkeleton';
import { SessionProps } from '@/types/sesstionType';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const Page = () => {
  const [sessions, setSession] = useState<SessionProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 7;

  // Debounce search input
  useEffect(() => {
    const times = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300);
    return () => clearTimeout(times);
  }, [searchTerm]);

  // Filter sessions by search term (title or description)
  const filteredSessions = useMemo(() => {
    if (!debouncedSearch) return sessions;
    const query = debouncedSearch.toLowerCase();
    return sessions.filter((session) => {
      return (
        session.sessionTitle?.toLowerCase().includes(query) ||
        session.sessionDescription?.toLowerCase().includes(query)
      );
    });
  }, [sessions, debouncedSearch]);

  // Reset to first page when filtering changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const totalPage = Math.max(1, Math.ceil(filteredSessions.length / limit));
  const startIndex = (page - 1) * limit;
  const paginatedSession = filteredSessions.slice(
    startIndex,
    startIndex + limit,
  );

  useEffect(() => {
    const fetchSessions = async (retry = 1) => {
      try {
        setIsLoading(true);
        const res = await fetch(
          'https://study-platform-backend-drxm.onrender.com/api/v1/session',
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
          Discover expertly curated sessions designed to accelerate your
          learning journey
        </p>

        {/* Spinner While Loading */}
        {isLoading ? (
          <SessionSkeleton />
        ) : (
          <>
            {/* Search Input */}
            <div className="w-full md:w-2/3 mx-auto mb-6">
              <div className="flex gap-2 items-center">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search sessions by title or description..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-full disabled:opacity-50 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Showing {filteredSessions.length} result
                {filteredSessions.length !== 1 ? 's' : ''}
              </p>
            </div>

            {filteredSessions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No sessions found matching your search.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedSession.map((session: SessionProps) => {
                  const currentTime = new Date();
                  const sessionEndTime = new Date(session.classEndDate);
                  const isSessionEnded = currentTime > sessionEndTime;

                  return (
                    <div
                      key={session._id}
                      className="bg-white rounded-lg shadow-sm p-4 transition transform hover:scale-95"
                    >
                      <div className="mt-2 mb-3">
                        {isSessionEnded ? (
                          <span className="bg-red-100 text-red-600 text-sm font-semibold py-2 px-4 rounded-full">
                            Closed
                          </span>
                        ) : (
                          <span className="bg-green-200 text-green-700 text-xs font-semibold py-2 px-4 rounded-full">
                            Open
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-blue-600 mb-2">
                        {session.sessionTitle}
                      </h3>
                      <p className="text-gray-700 text-sm mb-3">
                        {session.sessionDescription}
                      </p>
                      <div className="flex justify-end items-center mb-3">
                        <Link
                          href={`/session/${session._id}`}
                          aria-label={`Continue learning ${session.sessionTitle}`}
                        >
                          <button
                            aria-label={`Continue learning ${session.sessionTitle}`}
                            className="bg-linear-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold py-2 px-5 rounded-full transition-all shadow-sm hover:from-blue-600 hover:to-indigo-700 cursor-pointer"
                          >
                            Read More
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-10 space-x-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-full disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>
              <span className="text-lg font-semibold text-blue-600">
                Page {page} of {totalPage}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
                disabled={page === totalPage}
                className="px-6 py-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-full disabled:opacity-50 cursor-pointer"
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
