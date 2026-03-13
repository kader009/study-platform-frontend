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
import {
  BarChart3,
  CircleCheckBig,
  Clock,
  Trophy,
  Target,
  CircleCheck,
  Flame,
  Medal,
  TrendingUp,
} from 'lucide-react';

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

  // Cleanup: ensure completedIds only contains sessionIds that belong to
  useEffect(() => {
    if (!email) return;
    if (!Array.isArray(bookedSessions) || bookedSessions.length === 0) return;
    if (!Array.isArray(completedIds) || completedIds.length === 0) return;

    const validIds = (bookedSessions as BookedSession[]).map(
      (book) => book.sessionId,
    );
    const filtered = completedIds.filter((id) => validIds.includes(id));

    if (filtered.length !== completedIds.length) {
      setCompletedIds(filtered);
      try {
        localStorage.setItem(`progress_${email}`, JSON.stringify(filtered));
      } catch {
        // ignore localStorage errors
      }
    }
  }, [bookedSessions, completedIds, email]);

  const bookedCount = Array.isArray(bookedSessions) ? bookedSessions.length : 0;
  const materialsCount = myMaterials?.totalMaterials || 0;
  // Count only those completed IDs that belong to current booked sessions
  const completedCount = Array.isArray(bookedSessions)
    ? (bookedSessions as BookedSession[]).filter((b) =>
        completedIds.includes(b.sessionId),
      ).length
    : 0;
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
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">Booked Sessions</h2>
            <p className="text-2xl font-bold">
              {loading ? '...' : bookedCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Completed</h3>
            <p className="text-2xl font-bold">
              {loading ? '...' : completedCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold">Study Materials</h4>
            <p className="text-2xl font-bold">
              {loading ? '...' : materialsCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold">Overall Progress</h4>
            <p className="text-2xl font-bold">
              {loading ? '...' : `${progressPercent}%`}
            </p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                My Progress Tracker
              </h2>
              <span className="text-sm text-gray-500">
                {completedCount}/{bookedCount} sessions completed
              </span>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div
                className="bg-black h-4 rounded-full transition-all duration-500"
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
                            ? 'bg-gray-100 border-gray-300'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleComplete(booked.sessionId)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                              isCompleted
                                ? 'bg-black border-black text-white'
                                : 'border-gray-400 hover:border-black'
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
                              Booked session {index + 1}
                            </p>
                            <p className="text-xs text-gray-500">
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
                              ? 'bg-black text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {isCompleted ? (
                            <span className="flex items-center gap-1">
                              <CircleCheckBig className="w-3.5 h-3.5" />{' '}
                              Completed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> In Progress
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No booked sessions yet.{' '}
                <Link
                  href="/session"
                  className="text-black font-semibold hover:underline"
                >
                  Browse Sessions
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Student Specific Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="text-lg font-semibold mb-4">Recent Activities</h5>
            <ul className="space-y-2">
              {bookedCount > 0 && (
                <li>
                  Booked {bookedCount} session{bookedCount > 1 ? 's' : ''}
                </li>
              )}
              {completedCount > 0 && (
                <li>
                  Completed {completedCount} session
                  {completedCount > 1 ? 's' : ''}
                </li>
              )}
              {materialsCount > 0 && (
                <li>
                  Accessed {materialsCount} study material
                  {materialsCount > 1 ? 's' : ''}
                </li>
              )}
              {progressPercent === 100 && bookedCount > 0 && (
                <li>Achieved 100% progress on all sessions</li>
              )}
              {bookedCount === 0 &&
                completedCount === 0 &&
                materialsCount === 0 && (
                  <li className="text-gray-500 text-sm">
                    No activities yet.{' '}
                    <Link
                      href="/session"
                      className="text-black font-semibold hover:underline"
                    >
                      Start by booking a session
                    </Link>
                  </li>
                )}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
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
                {(bookedSessions as BookedSession[]).length > 0 ? (
                  (bookedSessions as BookedSession[])
                    .filter(
                      (booked) => !completedIds.includes(booked.sessionId),
                    )
                    .slice(0, 3)
                    .map((booked: BookedSession) => {
                      const session = sessionMap.get(booked.sessionId);
                      return (
                        <tr key={booked._id}>
                          <td className="border px-4 py-2 text-center text-sm">
                            {session?.classStartDate
                              ? new Date(
                                  session.classStartDate,
                                ).toLocaleDateString()
                              : session?.date
                                ? new Date(session.date).toLocaleDateString()
                                : 'TBA'}
                          </td>
                          <td className="border px-4 py-2 text-center text-sm">
                            {session?.sessionTitle ||
                              session?.subject ||
                              'Untitled'}
                          </td>
                          <td className="border px-4 py-2 text-center text-sm">
                            {session?.tutorName || booked.tutorEmail}
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="border px-4 py-2 text-center text-gray-500 text-sm"
                    >
                      No upcoming sessions.{' '}
                      <Link
                        href="/session"
                        className="text-black font-semibold hover:underline"
                      >
                        Browse sessions
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Achievements
            </h1>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span
                  className={`${bookedCount >= 1 ? 'text-black' : 'text-gray-300'}`}
                >
                  <Target className="w-7 h-7" />
                </span>
                <div>
                  <p className="font-medium">First Step</p>
                  <p className="text-xs text-gray-500">
                    Book your first session
                  </p>
                </div>
                {bookedCount >= 1 && (
                  <span className="ml-auto text-black text-xs font-bold">
                    Unlocked!
                  </span>
                )}
              </li>
              <li className="flex items-center gap-3">
                <span
                  className={`${completedCount >= 1 ? 'text-black' : 'text-gray-300'}`}
                >
                  <CircleCheck className="w-7 h-7" />
                </span>
                <div>
                  <p className="font-medium">Session Master</p>
                  <p className="text-xs text-gray-500">
                    Complete your first session
                  </p>
                </div>
                {completedCount >= 1 && (
                  <span className="ml-auto text-black text-xs font-bold">
                    Unlocked!
                  </span>
                )}
              </li>
              <li className="flex items-center gap-3">
                <span
                  className={`${completedCount >= 5 ? 'text-black' : 'text-gray-300'}`}
                >
                  <Flame className="w-7 h-7" />
                </span>
                <div>
                  <p className="font-medium">Dedicated Learner</p>
                  <p className="text-xs text-gray-500">Complete 5 sessions</p>
                </div>
                {completedCount >= 5 && (
                  <span className="ml-auto text-black text-xs font-bold">
                    Unlocked!
                  </span>
                )}
              </li>
              <li className="flex items-center gap-3">
                <span
                  className={`${progressPercent === 100 ? 'text-black' : 'text-gray-300'}`}
                >
                  <Medal className="w-7 h-7" />
                </span>
                <div>
                  <p className="font-medium">100% Complete</p>
                  <p className="text-xs text-gray-500">
                    Finish all booked sessions
                  </p>
                </div>
                {progressPercent === 100 && (
                  <span className="ml-auto text-black text-xs font-bold">
                    Unlocked!
                  </span>
                )}
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Stats Summary
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Sessions Booked</span>
                  <span className="font-bold">{bookedCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full"
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
                    className="bg-black h-2 rounded-full"
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
                    className="bg-black h-2 rounded-full"
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
