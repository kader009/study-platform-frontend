import { ReactNode } from 'react';
import Sidebar from './_components/SideBar';

const Dashbooardlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
};

export default Dashbooardlayout;
