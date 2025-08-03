import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { authOptions } from '@/lib/auth';
import { Providers } from '@/app/providers';
import ScrollProgress from '../components/ScrollProgress';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
import Head from './head';

// Dynamically import VideoPreloader with no SSR
const VideoPreloader = dynamic(() => import('../components/VideoPreloader'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

// Metadata is now handled in head.tsx

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, headersList] = await Promise.all([
    getServerSession(authOptions),
    headers()
  ]);
  
  // Safely get the pathname from headers
  const pathname = headersList?.get('x-pathname') || '';
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <Head />
      </head>
      <body className={inter.className}>
        <Providers session={session}>
          <VideoPreloader />
          <ScrollProgress />
          {children}
          {!isAdminRoute && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
