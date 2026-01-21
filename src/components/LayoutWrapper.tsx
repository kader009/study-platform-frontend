'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/shared/Navbar';
import Footer from '@/shared/Footer';
import AIChatbot from '@/components/AIChatbot';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
      <AIChatbot />
    </>
  );
}
