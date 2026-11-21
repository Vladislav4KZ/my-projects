import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjects } from '@/lib/projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectIcons, hasProjectIcon } from '@/components/icons';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import { SeoJsonLd } from '@/components/seo-json-ld';

const SITE_URL = 'https://vladislav4kz.github.io/my-projects/';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const pageName = lang === 'ru' ? 'Главная страница' : 'Home';
  const title = `${pageName} | $_Vladislav's Projects`;
  const description = dictionary.home.subtitle;
  const url = `${SITE_URL}${lang}/`;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      type: 'website',
      siteName: "$_Vladislav's Projects",
      title,
      description,
      url,
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
    },
    twitter: { card: 'summary', title, description },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const projects = getProjects(lang);
  const dictionary = await getDictionary(lang);
  const pageUrl = `${SITE_URL}${lang}/`;
  const pageName = lang === 'ru' ? 'Главная страница' : 'Home';
  const title = `${pageName} | $_Vladislav's Projects`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: dictionary.home.subtitle,
    url: pageUrl,
    inLanguage: lang,
    isPartOf: { '@type': 'WebSite', name: "$_Vladislav's Projects", url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.title,
        url: `${SITE_URL}${lang}/projects/${project.slug}/`,
      })),
    },
  };

  return (
    <>
      <SeoJsonLd data={jsonLd} />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <section className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">{dictionary.home.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{dictionary.home.subtitle}</p>
        </section>
        <section className="mt-16">
          <h2 className="mb-10 text-center font-headline text-3xl font-bold">{dictionary.home.projects_header}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.slug} href={`/${lang}/projects/${project.slug}/`} className="group block">
                <Card className="h-full border-border/50 transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:shadow-xl hover:border-primary/50">
                  <CardHeader className="flex-row items-center gap-4">
                    {hasProjectIcon(project.slug) && (
                      <div className="rounded-lg bg-primary/10 p-3 text-primary">
                        <ProjectIcons slug={project.slug} className="h-8 w-8" />
                      </div>
                    )}
                    <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent><p className="text-muted-foreground">{project.shortDescription}</p></CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
