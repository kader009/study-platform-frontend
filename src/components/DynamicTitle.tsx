'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const DynamicTitle = () => {
  const pathname = usePathname();

  useEffect(() => {
    let pageTitle = 'Edunest';

    if (pathname === '/') pageTitle = 'Edunest | Home';
    else if (pathname.startsWith('/session/')) pageTitle = 'Edunest | Session Details';
    else if (pathname.startsWith('/session')) pageTitle = 'Edunest | Approved Session';
    else if (pathname.startsWith('/contact')) pageTitle = 'Edunest | Contact';
    else if (pathname.startsWith('/dashboard/admin/all-user')) pageTitle = 'Edunest | All User';
    else if (pathname.startsWith('/dashboard/admin/all-session')) pageTitle = 'Edunest | All Session';
    else if (pathname.startsWith('/dashboard/admin/all-material')) pageTitle = 'Edunest | All Material';
    else if (pathname.startsWith('/dashboard/admin/profile')) pageTitle = 'Edunest | Profile';

    document.title = pageTitle;
  }, [pathname]);

  return null;
};

export default DynamicTitle;
