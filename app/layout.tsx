import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { authOptions } from '@/lib/auth';
import { Providers } from '@/app/providers';
import ScrollProgress from '../components/ScrollProgress';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Revoult Studio - Digital Innovation & Design',
  description: 'Crafting exceptional digital experiences with innovative solutions and cutting-edge technology for your business.',
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
          <ScrollProgress />
          {children}
          {!isAdminRoute && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
