import { ReactNode } from 'react';
import Sidebar from './_components/SideBar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EduNest | Dashboard',
  description: 'A Learning Platform Dashboard',
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full">
      <Sidebar />
      <main className="md:ml-48 min-h-screen overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
