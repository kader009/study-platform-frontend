'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import {
  useGetbookByemailQuery,
  useGetMaterialByemailQuery,
  useAllSessionQuery,
} from '@/redux/endApi';
import Link from 'next/link';
import { Session } from '@/types/routeSession';

interface BookedSession {
  _id: string;
  sessionId: string;
  tutorEmail: string;
  registrationFee: string;
}

export default function StudentDashboard() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const email = user?.email || '';

  const { data: bookedSessions = [], isLoading: bookingsLoading } =
    useGetbookByemailQuery(email, { skip: !email });
  const { data: myMaterials = [], isLoading: materialsLoading } =
    useGetMaterialByemailQuery(email, { skip: !email });
  const { data: allSessions = [] } = useAllSessionQuery(undefined);

  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Load completed sessions from localStorage
  useEffect(() => {
    if (email) {
      const saved = localStorage.getItem(`progress_${email}`);
      if (saved) setCompletedIds(JSON.parse(saved));
    }
  }, [email]);

  const toggleComplete = useCallback(
    (sessionId: string) => {
      setCompletedIds((prev) => {
        const updated = prev.includes(sessionId)
          ? prev.filter((id) => id !== sessionId)
          : [...prev, sessionId];
        localStorage.setItem(`progress_${email}`, JSON.stringify(updated));
        return updated;
      });
    },
    [email],
  );

  const bookedCount = Array.isArray(bookedSessions) ? bookedSessions.length : 0;
  const materialsCount = myMaterials?.totalMaterials || 0;
  const completedCount = completedIds.length;
  const progressPercent =
    bookedCount > 0 ? Math.round((completedCount / bookedCount) * 100) : 0;

  // Map sessionId to session title
  const sessionMap = new Map<string, Session>();
  if (Array.isArray(allSessions)) {
    allSessions.forEach((s: Session) => sessionMap.set(s._id, s));
  }

  const loading = bookingsLoading || materialsLoading;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Booked Sessions</h2>
            <p className="text-2xl font-bold">
              {loading ? '...' : bookedCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Completed</h3>
            <p className="text-2xl font-bold text-green-600">
              {loading ? '...' : completedCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold">Study Materials</h4>
            <p className="text-2xl font-bold">
              {loading ? '...' : materialsCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold">Overall Progress</h4>
            <p className="text-2xl font-bold text-blue-600">
              {loading ? '...' : `${progressPercent}%`}
            </p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">📊 My Progress Tracker</h2>
              <span className="text-sm text-gray-500">
                {completedCount}/{bookedCount} sessions completed
              </span>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div
                className="bg-linear-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Session List with Checkboxes */}
            {bookedCount > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {(bookedSessions as BookedSession[]).map(
                  (booked: BookedSession, index: number) => {
                    const session = sessionMap.get(booked.sessionId);
                    const isCompleted = completedIds.includes(booked.sessionId);

                    return (
                      <div
                        key={booked._id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                          isCompleted
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleComplete(booked.sessionId)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                              isCompleted
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-400 hover:border-blue-500'
                            }`}
                          >
                            {isCompleted && (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                          <div>
                            <p
                              className={`font-medium ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}
                            >
                              {session?.sessionTitle ||
                                session?.title ||
                                `Session #${index + 1}`}
                            </p>
                            <p className="text-xs text-gray-500">
                              Tutor: {session?.tutorName || booked.tutorEmail}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            isCompleted
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {isCompleted ? '✅ Completed' : '⏳ In Progress'}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No booked sessions yet.{' '}
                <Link href="/session" className="text-blue-600 hover:underline">
                  Browse Sessions
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Student Specific Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-lg font-semibold mb-4">Recent Activities</h5>
            <ul className="space-y-2">
              <li>Booked a session</li>
              <li>Create study note</li>
              <li>Joined CSS class</li>
              <li>Completed React Quiz</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h6 className="text-lg font-semibold mb-4">Upcoming Sessions</h6>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Tutor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 text-center">Upcoming</td>
                  <td className="border px-4 py-2 text-center">
                    Redux Toolkit
                  </td>
                  <td className="border px-4 py-2 text-center">Martin Jack</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-center">Upcoming</td>
                  <td className="border px-4 py-2 text-center">TypeScript</td>
                  <td className="border px-4 py-2 text-center">
                    Michael Brown
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-lg font-semibold mb-4">🏆 Achievements</h1>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span
                  className={`text-2xl ${bookedCount >= 1 ? '' : 'grayscale opacity-40'}`}
                >
                  🎯
                </span>
                <div>
                  <p className="font-medium">First Step</p>
                  <p className="text-xs text-gray-500">
                    Book your first session
                  </p>
                </div>
                {bookedCount >= 1 && (
                  <span className="ml-auto text-green-600 text-xs font-bold">
                    Unlocked!
                  </span>
                )}
              </li>
              <li className="flex items-center gap-3">
                <span
                  className={`text-2xl ${completedCount >= 1 ? '' : 'grayscale opacity-40'}`}
                >
                  ✅
                </span>
                <div>
                  <p className="font-medium">Session Master</p>
                  <p className="text-xs text-gray-500">
                    Complete your first session
                  </p>
                </div>
                {completedCount >= 1 && (
                  <span className="ml-auto text-green-600 text-xs font-bold">
                    Unlocked!
                  </span>
                )}
              </li>
              <li className="flex items-center gap-3">
                <span
                  className={`text-2xl ${completedCount >= 5 ? '' : 'grayscale opacity-40'}`}
                >
                  🔥
                </span>
                <div>
                  <p className="font-medium">Dedicated Learner</p>
                  <p className="text-xs text-gray-500">Complete 5 sessions</p>
                </div>
                {completedCount >= 5 && (
                  <span className="ml-auto text-green-600 text-xs font-bold">
                    Unlocked!
                  </span>
                )}
              </li>
              <li className="flex items-center gap-3">
                <span
                  className={`text-2xl ${progressPercent === 100 ? '' : 'grayscale opacity-40'}`}
                >
                  🏅
                </span>
                <div>
                  <p className="font-medium">100% Complete</p>
                  <p className="text-xs text-gray-500">
                    Finish all booked sessions
                  </p>
                </div>
                {progressPercent === 100 && (
                  <span className="ml-auto text-green-600 text-xs font-bold">
                    Unlocked!
                  </span>
                )}
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">📈 Stats Summary</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Sessions Booked</span>
                  <span className="font-bold">{bookedCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${Math.min(bookedCount * 10, 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Sessions Completed</span>
                  <span className="font-bold">{completedCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${progressPercent}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Materials Accessed</span>
                  <span className="font-bold">{materialsCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{
                      width: `${Math.min(materialsCount * 10, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
