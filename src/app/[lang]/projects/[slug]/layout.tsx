import type { Metadata } from 'next'
import type { Locale } from '@/i18n-config'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { i18n } from '@/i18n-config'


export async function generateStaticParams() {
  const paths = i18n.locales.flatMap((lang) => {
    const projects = getProjects(lang);
    return projects.map((project) => ({
      lang,
      slug: project.slug,
    }));
  });
  return paths;
}

export async function generateMetadata({ params }: { params: { lang: Locale, slug: string } }): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProjectBySlug(slug, lang)
  if (!project) {
    return { title: 'Project Not Found' }
  }
  return {
    title: `${project.title} | $_Vladislav's Projects`,
    description: project.shortDescription,
  }
}


export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
