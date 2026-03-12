'use client';

import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import {
  useTutorSessionQuery,
  useTutorSessionWithCountQuery,
} from '@/redux/endApi';

import { Session } from '@/types/routeSession';
import { StudentItem, CourseItem, SessionItem } from '@/types/tutorDashboard';

export default function TutorDashboard() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const { data: sessions, isLoading } = useTutorSessionQuery(user?.email);
  const { data: bookedData, isLoading: bookedLoading } =
    useTutorSessionWithCountQuery(user?.email);

  const sessionCount = sessions?.length || 0;
  // bookedData shape
  const studentCount = bookedData?.totalUniqueStudents ?? 0;
  const totalBookings = bookedData?.totalBookings ?? 0;

  // Build a map of sessionId 
  const courseCountMap: Record<string, number> = {};
  if (bookedData?.students && Array.isArray(bookedData.students)) {
    bookedData.students.forEach((session: StudentItem) => {
      const ids: string[] = session.bookedSessionIds || [];
      ids.forEach((sid) => {
        courseCountMap[sid] = (courseCountMap[sid] || 0) + 1;
      });
    });
  }

  // Prepare courses list from sessions
  const courses: CourseItem[] = (sessions || []).map((sess: Session) => ({
    id: sess._id,
    title: sess.sessionTitle ?? sess.title ?? 'Untitled',
    students: courseCountMap[sess._id] ?? 0,
  }));

  // Helper: parse session start date from possible fields
  const parseSessionStart = (s: Session): Date | null => {
    const tryDate = (val?: string) => {
      if (!val) return null;
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d;
    };

    // prefer classStartDate, then classStart, then date+time, then date
    return (
      tryDate(s.classStartDate) ||
      tryDate(s.classStart) ||
      (s.date ? tryDate(`${s.date} ${s.time || ''}`) : null) ||
      tryDate(s.date) ||
      null
    );
  };

  const now = Date.now();
  type SessionWithStart = SessionItem & {
    start: Date | null;
    hasTime?: boolean;
  };
    const upcomingSessions: SessionWithStart[] = (sessions || [])
      .map((sess: Session) => {
        const start = parseSessionStart(sess as SessionItem);
        // Determine if the original session data included a time portion.
        // Some backends return a date-only string (e.g. "2026-03-21") which when
        // parsed in JS becomes midnight UTC and may show as 6:00 AM in some timezones.
        // To avoid that, prefer an explicit time field or detect a time portion
        // in the original string values (classStartDate, classStart, date).
        const timeRegex = /T\d{2}:\d{2}|:\d{2}/;
        const hasTime = Boolean((sess as SessionItem).time) ||
          (typeof (sess as SessionItem).classStartDate === 'string' && timeRegex.test((sess as SessionItem).classStartDate!)) ||
          (typeof (sess as SessionItem).classStart === 'string' && timeRegex.test((sess as SessionItem).classStart!)) ||
          (typeof (sess as SessionItem).date === 'string' && timeRegex.test((sess as SessionItem).date!));
        return {
          ...(sess as SessionItem),
          start,
          hasTime,
        } as SessionWithStart;
      })
      .filter((s: SessionWithStart) => s.start && s.start.getTime() > now)
      .sort((a: SessionWithStart, b: SessionWithStart) =>
        a.start!.getTime() > b.start!.getTime() ? 1 : -1,
      )
      .slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Tutor Dashboard</h1>
        </div>

        {/* Stats Cards - Tutor specific */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">My Sessions</h2>
            <p className="text-2xl font-bold">
              {isLoading ? '...' : sessionCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">My Students</h2>
            <p className="text-2xl font-bold">
              {bookedLoading ? '...' : studentCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">Total Bookings</h2>
            <p className="text-2xl font-bold">
              {bookedLoading ? '...' : totalBookings}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">Average Rating</h2>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>

        {/* Tutor Specific Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">My Upcoming Sessions</h2>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Student</th>
                </tr>
              </thead>
              <tbody>
                {upcomingSessions.length > 0 ? (
                  upcomingSessions.map((s: SessionWithStart, idx: number) => (
                    <tr key={s._id || idx}>
                      <td className="border px-4 py-2 text-center">
                        {s.start
                          ? s.hasTime
                            ? s.start.toLocaleString()
                            : s.start.toLocaleDateString()
                          : 'TBA'}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {s.sessionTitle ?? s.title ?? 'Untitled'}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {courseCountMap[s._id] ?? 0} students
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      No upcoming sessions
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Students</h2>
            {bookedLoading ? (
              <p>Loading students…</p>
            ) : bookedData?.students && bookedData.students.length > 0 ? (
              <ul className="space-y-3">
                {bookedData.students.map(
                  (student: {
                    name: string;
                    email: string;
                    image?: string;
                    totalBookings?: number;
                  }) => (
                    <li key={student.email} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {student.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={student.image}
                            alt={student.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-500">
                            {student.name?.charAt(0) || ''}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                      <div className="ml-auto text-sm text-gray-600">
                        {student.totalBookings} bookings
                      </div>
                    </li>
                  ),
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No student bookings yet.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">My Courses</h2>
            {sessions && sessions.length > 0 ? (
              <ul className="space-y-2">
                {courses.map((course: CourseItem) => (
                  <li
                    key={course.id}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{course.title}</span>
                    <span className="text-sm text-gray-600">
                      {course.students} students
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">You have no courses yet.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>
            <ul className="space-y-2">
              <li>Great teacher! - John</li>
              <li>Very helpful - Sarah</li>
              <li>Excellent - Mike</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
