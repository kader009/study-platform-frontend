'use client';

import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import {
  useGetbookByemailQuery,
  useGetMaterialByemailQuery,
} from '@/redux/endApi';

export default function StudentDashboard() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const email = user?.email || '';

  const { data: bookedSessions = [], isLoading: bookingsLoading } =
    useGetbookByemailQuery(email, {
      skip: !email,
    });
  const { data: myMaterials = [], isLoading: materialsLoading } =
    useGetMaterialByemailQuery(email, {
      skip: !email,
    });

  const bookedCount = Array.isArray(bookedSessions) ? bookedSessions.length : 0;
  const materialsCount = myMaterials?.totalMaterials || 0;
  const completedSessions = Array.isArray(bookedSessions)
    ? bookedSessions.length
    : 0;

  const loading = bookingsLoading || materialsLoading;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
        </div>

        {/* Stats Cards - Student specific */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Booked Sessions</h2>
            <p className="text-2xl font-bold">
              {loading ? '...' : bookedCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Completed Sessions</h3>
            <p className="text-2xl font-bold">
              {loading ? '...' : completedSessions}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold">Study Materials</h4>
            <p className="text-2xl font-bold">
              {loading ? '...' : materialsCount}
            </p>
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
            <h1 className="text-lg font-semibold mb-4">My Progress</h1>
            <ul className="space-y-2">
              <li>React Course: 0% Complete</li>
              <li>TypeScript: 0% Complete</li>
              <li>Next.js: 0% Complete</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Achievements</h2>
            <ul className="space-y-2">
              <li>Completed 0 Sessions</li>
              <li>Perfect Quiz Score</li>
              <li>Active Learner Badge</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
