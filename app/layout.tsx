import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import { AnalyticsProvider } from '@/components/Analytics';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { team } from '@/data/team';

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

// TODO: Replace "Dev Studio" with final studio name when decided
export const metadata: Metadata = {
  title: 'Dev Studio — Full Stack Development Team | React, Node.js, TypeScript',
  description: 'Two full-stack developers building scalable web applications. Expertise in React, Next.js, Node.js, TypeScript, MongoDB, AWS. Available for projects and collaboration.',
  keywords: [
    'Dev Studio', 'Full Stack Development Team', 'React Developers',
    'Node.js Development', 'TypeScript Experts', 'Next.js Development',
    'MVP Development', 'Web Application Development', 'Scalable Products',
    'MongoDB', 'AWS', 'Docker',
  ],
  authors: [{ name: 'Dev Studio', url: 'https://abhishekvaghela.dev' }],
  creator: 'Dev Studio',
  publisher: 'Dev Studio',
  metadataBase: new URL('https://abhishekvaghela.dev'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abhishekvaghela.dev',
    title: 'Dev Studio — Full Stack Development Team',
    description: 'Two full-stack developers building scalable web apps with React, Node.js, and modern technologies.',
    siteName: 'Dev Studio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Dev Studio - Full Stack Development Team' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Studio — Full Stack Development Team',
    description: 'Two full-stack developers. React, Node.js, TypeScript, AWS.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'technology',
};

// TODO: Replace "Dev Studio" with final studio name when decided
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dev Studio',
  description: 'Two full-stack developers building scalable web applications. Expertise in React, Next.js, Node.js, TypeScript, MongoDB, AWS.',
  url: 'https://abhishekvaghela.dev',
  knowsAbout: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'Redis', 'OpenSearch'],
  founder: team.map((member) => ({
    '@type': 'Person',
    name: member.name,
    email: member.email,
    ...(member.telephone ? { telephone: member.telephone } : {}),
    url: member.linkedin,
    sameAs: [member.github, member.linkedin].filter(Boolean),
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KGZJ7TMT');`}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.className} ${jetbrainsMono.variable} ${flagfies.variable} antialiased`}>
        <div className="noise-overlay" aria-hidden="true" />
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
