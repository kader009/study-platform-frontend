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

    document.title = pageTitle;
  }, [pathname]);

  return null;
};

export default DynamicTitle;
