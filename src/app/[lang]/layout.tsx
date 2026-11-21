import type { Metadata } from 'next';
import '../globals.css';
import { getDictionary } from '@/get-dictionary';
import { type Locale, i18n } from '@/i18n-config';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { ThemeProvider } from '@/components/theme-provider';

const SITE_URL = 'https://vladislav4kz.github.io/my-projects/';

export const dynamicParams = false;

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const languageAlternates: Record<string, string> = Object.fromEntries(
    i18n.locales.map((locale) => [locale, `${SITE_URL}${locale}/`]),
  );
  const description = dictionary.home.subtitle;
  const title = dictionary.header.title;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${title}` },
    description,
    alternates: {
      canonical: `${SITE_URL}${lang}/`,
      languages: { ...languageAlternates, 'x-default': SITE_URL },
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
      siteName: title,
      title,
      description,
      url: `${SITE_URL}${lang}/`,
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      alternateLocale: lang === 'ru' ? ['en_US'] : ['ru_RU'],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header lang={lang} dictionary={dictionary.header} />
            <main className="flex-1">{children}</main>
            <Footer dictionary={dictionary.footer} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
