import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Revoult Studio - Digital Innovation & Design',
  description: 'Crafting exceptional digital experiences with innovative solutions and cutting-edge technology for your business.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/VerticalLogo.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/VerticalLogo.png' },
    ],
  },
  openGraph: {
    title: 'Revoult Studio - Digital Innovation & Design',
    description: 'Crafting exceptional digital experiences with innovative solutions and cutting-edge technology for your business.',
    url: '/',
    siteName: 'Revoult Studio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/VerticalLogo.png',
        width: 800,
        height: 600,
        alt: 'Revoult Studio Logo',
      },
    ],
  },
  other: {
    'http-equiv': 'Cache-Control',
    content: 'public, max-age=31536000, immutable',
  },
};

export default function Head() {
  return (
    <head>
      <link rel="icon" href="/VerticalLogo.png" type="image/png" />
      <link rel="shortcut icon" href="/VerticalLogo.png" type="image/png" />
      <link rel="apple-touch-icon" href="/VerticalLogo.png" />
    </head>
  );
}
