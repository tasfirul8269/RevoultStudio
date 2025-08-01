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
  // Add preconnect links for video sources in metadata
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Revoult Studio - Digital Innovation & Design',
    description: 'Crafting exceptional digital experiences with innovative solutions and cutting-edge technology for your business.',
    url: '/',
    siteName: 'Revoult Studio',
    locale: 'en_US',
    type: 'website',
  },
  // Add cache control headers
  other: {
    'http-equiv': 'Cache-Control',
    content: 'public, max-age=31536000, immutable',
  },
};

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
