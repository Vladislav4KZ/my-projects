import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/projects';
import { i18n } from '@/i18n-config';

// Required for Next.js 15 with output: 'export'.
export const dynamic = 'force-static';

const SITE_URL = 'https://vladislav4kz.github.io/my-projects/';

export default function sitemap(): MetadataRoute.Sitemap {
  const localeUrls: Record<string, string> = Object.fromEntries(
    i18n.locales.map((locale) => [locale, `${SITE_URL}${locale}/`]),
  );

  const entries: MetadataRoute.Sitemap = [{
    url: SITE_URL,
    alternates: { languages: { ...localeUrls, 'x-default': SITE_URL } },
  }];

  for (const lang of i18n.locales) {
    entries.push({
      url: `${SITE_URL}${lang}/`,
      alternates: { languages: { ...localeUrls, 'x-default': SITE_URL } },
    });

    for (const project of getProjects(lang)) {
      const projectUrls: Record<string, string> = Object.fromEntries(
        i18n.locales.map((locale) => [locale, `${SITE_URL}${locale}/projects/${project.slug}/`]),
      );
      entries.push({
        url: `${SITE_URL}${lang}/projects/${project.slug}/`,
        alternates: { languages: { ...projectUrls, 'x-default': SITE_URL } },
      });
    }
  }

  return entries;
}
