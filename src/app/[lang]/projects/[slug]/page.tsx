import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import { getProjectBySlug } from '@/lib/projects';
import { ProjectPageClient } from '@/components/project-page-client';
import { SeoJsonLd } from '@/components/seo-json-ld';

const SITE_URL = 'https://vladislav4kz.github.io/my-projects/';

function getAbsoluteImageUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  const relativePath = src.replace(/^\/(?:my-projects\/)?/, '');
  return new URL(relativePath, SITE_URL).toString();
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const project = getProjectBySlug(slug, lang);
  if (!project) notFound();

  const dictionary = await getDictionary(lang);
  const canonicalUrl = `${SITE_URL}${lang}/projects/${slug}/`;
  const imageUrl = project.screenshots[0]
    ? getAbsoluteImageUrl(project.screenshots[0].src)
    : `${SITE_URL}images/projects/half-life-rus/HLRus_1.jpg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.shortDescription,
    url: canonicalUrl,
    inLanguage: lang,
    image: imageUrl,
    isPartOf: { '@type': 'WebSite', name: "$_Vladislav's Projects", url: SITE_URL },
  };

  return (
    <>
      <SeoJsonLd data={jsonLd} />
      <ProjectPageClient project={project} dictionary={dictionary} lang={lang} />
    </>
  );
}
