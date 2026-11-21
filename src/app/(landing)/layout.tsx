import type { Metadata } from 'next';
import '../globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const SITE_URL = 'https://vladislav4kz.github.io/my-projects/';
const SITE_DESCRIPTION = 'A collection of projects by $_Vladislav.';
const LANDING_TITLE = "Choose a language / Выберите язык | $_Vladislav's Projects";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: LANDING_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}en/`,
      ru: `${SITE_URL}ru/`,
      'x-default': SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: "$_Vladislav's Projects",
    title: LANDING_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    alternateLocale: ['ru_RU'],
  },
  twitter: {
    card: 'summary_large_image',
    title: LANDING_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function LandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
