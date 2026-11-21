import type { Metadata } from 'next';
import type { Locale } from '@/i18n-config';
import { getProjectBySlug, getProjects } from '@/lib/projects';
import { i18n } from '@/i18n-config';
import { getScreenshotAlt } from '@/lib/screenshot-alt';

const SITE_URL = 'https://vladislav4kz.github.io/my-projects/';
const SITE_NAME = "$_Vladislav's Projects";

export const dynamicParams = false;

export async function generateStaticParams({ params: { lang } }: { params: { lang: Locale } }) {
  return getProjects(lang).map((project) => ({ slug: project.slug }));
}

function getAbsoluteImageUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  // getProjects() adds /my-projects to local assets in GitHub Actions builds.
  const relativePath = src.replace(/^\/(?:my-projects\/)?/, '');
  return new URL(relativePath, SITE_URL).toString();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProjectBySlug(slug, lang);
  if (!project) return { title: lang === 'ru' ? 'Проект не найден' : 'Project not found' };

  const canonicalUrl = `${SITE_URL}${lang}/projects/${slug}/`;
  const pageTitle = `${project.title} | ${SITE_NAME}`;
  const languageAlternates: Record<string, string> = Object.fromEntries(
    i18n.locales.map((locale) => [locale, `${SITE_URL}${locale}/projects/${slug}/`]),
  );
  const image = project.screenshots[0]
    ? getAbsoluteImageUrl(project.screenshots[0].src)
    : `${SITE_URL}images/projects/half-life-rus/HLRus_1.jpg`;
  const firstScreenshot = project.screenshots[0];
  const imageAlt = firstScreenshot
    ? getScreenshotAlt(project.slug, firstScreenshot.hint, lang, project.title)
    : project.title;

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: { ...languageAlternates, 'x-default': SITE_URL },
    },
    openGraph: {
      type: 'article',
      siteName: "$_Vladislav's Projects",
      title: pageTitle,
      description: project.shortDescription,
      url: canonicalUrl,
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: project.shortDescription,
      images: [image],
    },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
