'use client';

import { useEffect, useState } from 'react';
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
import AdminDashboard from './_components/AdminDashboard';
import TutorDashboard from './_components/TutorDashboard';
import StudentDashboard from './_components/Studentdashboard';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';

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

const Page = () => {
  const [loading, setLoading] = useState(true);
  
  const userRole = useAppSelector((state:RootState) =>
    state.user.token ? state.user.user?.role : null
  ) as 'admin' | 'tutor' | 'student' | null;

  useEffect(() => {
    if (userRole !== null) {
      setLoading(false);
    } else {
      const checkRole = async () => {
        try {
          const storedRole = localStorage.getItem('userRole');
          if (!storedRole) {
            window.location.href = '/login';
          }
        } catch (error) {
          console.error('Error checking user role:', error);
        } finally {
          setLoading(false);
        }
      };
      checkRole();
    }
  }, [userRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!userRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-red-500">
          Please login to access dashboard
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'tutor':
        return <TutorDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return <>{renderDashboard()}</>;
};

export default Page;