import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { authOptions } from '@/lib/auth';
import { Providers } from '@/app/providers';
import ScrollProgress from '../components/ScrollProgress';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';

// Dynamically import VideoPreloader with no SSR
const VideoPreloader = dynamic(() => import('../components/VideoPreloader'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Revoult Studio - Digital Innovation & Design',
  description: 'Crafting exceptional digital experiences with innovative solutions and cutting-edge technology for your business.',
  other: {
    'http-equiv': 'Cache-Control',
    content: 'public, max-age=31536000, immutable',
  },
};

// Add preconnect links for video sources
export function Head() {
  return (
    <>
      <link rel="preconnect" href="https://your-video-cdn.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://your-video-cdn.com" />
      {/* Add more domains if your videos are hosted on different domains */}
    </>
  );
}

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
