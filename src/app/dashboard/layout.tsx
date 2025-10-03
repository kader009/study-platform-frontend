import { ReactNode } from 'react';
import Sidebar from './_components/SideBar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EduNest | Dashboard',
  description: 'A Learning Platform Dashboard',
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
