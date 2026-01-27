'use client';
import { Line, Pie } from 'react-chartjs-2';
import {
  useAllSessionQuery,
  useAllUserQuery,
  useAllTutorQuery,
  useAllMaterilQuery,
} from '@/redux/endApi';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { Userprops } from '@/types/userProps';

export default function AdminDashboard() {
  const { data: sessionsData, isLoading: sessionsLoading } =
    useAllSessionQuery(undefined);
  const { data: usersData, isLoading: usersLoading } =
    useAllUserQuery(undefined);
  const { data: tutorsData, isLoading: tutorsLoading } =
    useAllTutorQuery(undefined);
  const { data: materialsData, isLoading: materialsLoading } =
    useAllMaterilQuery(undefined);

  const totalSessions = Array.isArray(sessionsData) ? sessionsData.length : 0;
  const totalUsers = Array.isArray(usersData) ? usersData.length : 0;
  const totalTutors = Array.isArray(tutorsData) ? tutorsData.length : 0;
  const totalMaterials = Array.isArray(materialsData)
    ? materialsData.length
    : 0;
  // Aggregate users into daily counts for the last `rangeDays`
  const rangeDays = 30;
  const endDate = new Date();
  const startDate = subDays(endDate, rangeDays - 1);
  const dateList = eachDayOfInterval({ start: startDate, end: endDate });

  // initialize map with zero counts for each day
  const dailyCountsMap = new Map<string, number>();
  dateList.forEach((date) => dailyCountsMap.set(format(date, 'yyyy-MM-dd'), 0));

  if (Array.isArray(usersData)) {
    usersData.forEach((user: Userprops) => {
      const createdValue =
        user.createdAt ||
        user.created_at ||
        user.created ||
        (user.createdAtTimestamp ? String(user.createdAtTimestamp) : undefined);
      if (!createdValue) return;
      const createdDate = new Date(createdValue);
      if (Number.isNaN(createdDate.getTime())) return;
      const dateKey = format(createdDate, 'yyyy-MM-dd');
      if (dailyCountsMap.has(dateKey)) {
        dailyCountsMap.set(dateKey, (dailyCountsMap.get(dateKey) || 0) + 1);
      }
    });
  }

  const lineData = {
    labels: dateList.map((date) => format(date, 'MMM d')),
    datasets: [
      {
        label: 'New Users',
        data: dateList.map(
          (date) => dailyCountsMap.get(format(date, 'yyyy-MM-dd')) || 0,
        ),
        borderColor: 'rgb(59,130,246)',
        backgroundColor: 'rgba(59,130,246,0.12)',
      },
    ],
  };

  const pieData = {
    labels: ['NextJs', 'ReactJs', 'Typescript'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        </div>

        {/* Stats Cards - Admin specific */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Sessions</h2>
            <p className="text-2xl font-bold">
              {sessionsLoading ? '...' : totalSessions}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl font-bold">
              {usersLoading ? '...' : totalUsers}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Tutors</h2>
            <p className="text-2xl font-bold">
              {tutorsLoading ? '...' : totalTutors}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Study Materials</h2>
            <p className="text-2xl font-bold">
              {materialsLoading ? '...' : totalMaterials}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">User Growth</h2>
            <div className="w-full h-64 relative">
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Session Categories</h2>
            <div className="w-full h-64 relative">
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">User Management</h2>
            <ul className="space-y-2">
              <li>Active Users: 10</li>
              <li>Inactive Users: 5</li>
              <li>New Registrations: 1</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Revenue</h2>
            <ul className="space-y-2">
              <li>Total Revenue: $400</li>
              <li>This Month: $80</li>
              <li>Growth: +15%</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
