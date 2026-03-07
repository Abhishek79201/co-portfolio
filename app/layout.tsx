import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { AnalyticsProvider } from '@/components/Analytics';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
});

const flagfies = localFont({
  src: [
    { path: '../public/Flagfies.otf', weight: '400', style: 'normal' },
    { path: '../public/Flagfies.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--font-flagfies',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#050505',
};

export const metadata: Metadata = {
  title: 'Abhishek Vaghela — Full Stack Developer | React, Node.js, TypeScript',
  description: 'Full Stack MERN Developer with 4.5+ years of experience building scalable web apps. Expertise in React, Next.js, Node.js, TypeScript, MongoDB, AWS. Open for freelance & collaboration.',
  keywords: [
    'Full Stack Developer', 'MERN Stack Developer', 'React Developer India',
    'Node.js Developer', 'TypeScript Expert', 'Next.js Developer',
    'Freelance Web Developer', 'Abhishek Vaghela Portfolio',
    'JavaScript Developer', 'MongoDB', 'AWS', 'Docker',
  ],
  authors: [{ name: 'Abhishek Vaghela', url: 'https://abhishekvaghela.dev' }],
  creator: 'Abhishek Vaghela',
  publisher: 'Abhishek Vaghela',
  metadataBase: new URL('https://abhishekvaghela.dev'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abhishekvaghela.dev',
    title: 'Abhishek Vaghela — Full Stack Developer',
    description: 'Full Stack MERN Developer with 4.5+ years experience. Building scalable web apps with React, Node.js, and modern technologies.',
    siteName: 'Abhishek Vaghela',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Abhishek Vaghela - Full Stack Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Vaghela — Full Stack Developer',
    description: 'Full Stack MERN Developer. React, Node.js, TypeScript, AWS.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'technology',
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
    'https://linkedin.com/in/abhishekvaghela',
  ],
  worksFor: { '@type': 'Organization', name: 'Screenplay' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Government Engineering College, Modasa' },
  knowsAbout: ['JavaScript','React','Node.js','TypeScript','MongoDB','Express.js','Next.js','AWS','Docker'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.className} ${jetbrainsMono.variable} ${flagfies.variable} antialiased`}>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <SmoothScrollProvider>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
