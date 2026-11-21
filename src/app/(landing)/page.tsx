import Link from 'next/link';
import { SeoJsonLd } from '@/components/seo-json-ld';

const SITE_URL = 'https://vladislav4kz.github.io/my-projects/';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
] as const;

export default function LandingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "$_Vladislav's Projects",
    url: SITE_URL,
    inLanguage: ['en', 'ru'],
  };

  return (
    <>
      <SeoJsonLd data={jsonLd} />
      <main className="container mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          $_Vladislav&apos;s Projects
        </h1>
        <h2 id="language-selection-title" className="mt-8 text-lg font-normal text-muted-foreground">
          Choose a language / Выберите язык
        </h2>
        <nav aria-labelledby="language-selection-title" className="mt-4 flex flex-wrap justify-center gap-4">
          {languages.map(({ code, label }) => (
            <Link key={code} href={`/${code}/`} hrefLang={code} className="rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/10">
              {label}
            </Link>
          ))}
        </nav>
      </main>
    </>
  );
}
