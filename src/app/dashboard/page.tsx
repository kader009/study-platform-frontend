'use client';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const page = () => {
  // Data for Charts
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'New Users',
        data: [5, 10, 15, 20, 25],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const pieData = {
    labels: ['Math', 'Science', 'English'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
      },
    ],
  };
  return (
    <div className='h-screen'>
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">📅 Total Sessions</h2>
          <p className="text-2xl font-bold">50</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">👥 Total Users</h2>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">📖 Study Materials</h2>
          <p className="text-2xl font-bold">30</p>
        </div>
      </main>
      {/* Charts and Recent Activities */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md h-[27rem]">
          <h2 className="text-lg font-semibold">📈 User Growth</h2>
          <Line data={lineData} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md h-[27rem]">
          <h2 className="text-lg font-semibold">📊 Session Categories</h2>
          <Pie data={pieData} className='h-48'/>
        </div>
      </div>
    </div>
  );
};

export default page;
