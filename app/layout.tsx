import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AnalyticsProvider } from '@/components/Analytics';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Abhishek Vaghela — Full Stack MERN Developer',
  description: 'Passionate Full Stack Developer with extensive MERN stack experience. Building scalable web applications with React, Node.js, and modern technologies.',
  keywords: 'Full Stack Developer, MERN Stack, React Developer, Node.js, JavaScript, TypeScript, Web Development, Abhishek Vaghela',
  authors: [{ name: 'Abhishek Vaghela' }],
  creator: 'Abhishek Vaghela',
  publisher: 'Abhishek Vaghela',
  metadataBase: new URL('https://abhishekvaghela.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abhishekvaghela.dev',
    title: 'Abhishek Vaghela — Full Stack MERN Developer',
    description: 'Passionate Full Stack Developer with extensive MERN stack experience. Building scalable web applications with React, Node.js, and modern technologies.',
    siteName: 'Abhishek Vaghela Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Abhishek Vaghela - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Vaghela — Full Stack MERN Developer',
    description: 'Passionate Full Stack Developer with extensive MERN stack experience.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Abhishek Vaghela',
  jobTitle: 'Full Stack MERN Developer',
  url: 'https://abhishekvaghela.dev',
  email: 'vaghelaabhishek2580@gmail.com',
  telephone: '+91 8200394360',
  sameAs: [
    'https://github.com/abhishekvaghela',
    'https://linkedin.com/in/abhishekvaghela'
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Screenplay'
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Government Engineering College, Modasa'
  },
  knowsAbout: [
    'JavaScript',
    'React',
    'Node.js',
    'TypeScript',
    'MongoDB',
    'Express.js',
    'Next.js',
    'AWS',
    'Docker'
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}