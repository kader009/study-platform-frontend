'use client';

export default function StudentDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
        </div>

        {/* Stats Cards - Student specific */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Booked Sessions</h2>
            <p className="text-2xl font-bold">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Completed Sessions</h2>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Study Materials</h2>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>

        {/* Student Specific Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <ul className="space-y-2">
              <li>Booked a session</li>
              <li>Uploaded study material</li>
              <li>Joined CSS class</li>
              <li>Completed React Quiz</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
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
                  <td className="border px-4 py-2 text-center">May 10</td>
                  <td className="border px-4 py-2 text-center">
                    Redux Toolkit
                  </td>
                  <td className="border px-4 py-2 text-center">Mr. Rahim</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-center">May 15</td>
                  <td className="border px-4 py-2 text-center">TypeScript</td>
                  <td className="border px-4 py-2 text-center">Ms. Sarah</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">My Progress</h2>
            <ul className="space-y-2">
              <li>React Course: 75% Complete</li>
              <li>TypeScript: 50% Complete</li>
              <li>Next.js: 30% Complete</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Achievements</h2>
            <ul className="space-y-2">
              <li>Completed 5 Sessions</li>
              <li>Perfect Quiz Score</li>
              <li>Active Learner Badge</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
