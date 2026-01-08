'use client';

import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import { useTutorSessionQuery } from '@/redux/endApi';

export default function TutorDashboard() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const { data: sessions, isLoading } = useTutorSessionQuery(user?.email);

  const sessionCount = sessions?.length || 0;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Tutor Dashboard</h1>
        </div>

        {/* Stats Cards - Tutor specific */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">My Sessions</h2>
            <p className="text-2xl font-bold">
              {isLoading ? '...' : sessionCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">My Students</h2>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Average Rating</h2>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>

        {/* Tutor Specific Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
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
                <tr>
                  <td className="border px-4 py-2 text-center">May 10</td>
                  <td className="border px-4 py-2 text-center">
                    Redux Toolkit
                  </td>
                  <td className="border px-4 py-2 text-center">John Doe</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-center">May 12</td>
                  <td className="border px-4 py-2 text-center">Next.js</td>
                  <td className="border px-4 py-2 text-center">Jane Smith</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Earnings</h2>
            <ul className="space-y-2">
              <li>Total Earnings: $0</li>
              <li>This Month: $0</li>
              <li>Pending Payment: $0</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">My Courses</h2>
            <ul className="space-y-2">
              <li>React Advanced - 0 students</li>
              <li>TypeScript Basics - 0 students</li>
              <li>Next.js Mastery - 0 students</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
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
