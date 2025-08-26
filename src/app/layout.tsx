import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/Provider/Provider';
import PersistProvider from '@/redux/PersistProvider';
import { SessionProvider } from 'next-auth/react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'EduNest',
  description: 'A Learing Platform',
  icons: {
    icon: '/icons8-education-90.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          <PersistProvider>
              <Navbar />
              <SessionProvider>{children}</SessionProvider>
              <Footer />
          </PersistProvider>
        </Providers>
      </body>
    </html>
  );
}
