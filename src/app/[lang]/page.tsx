
import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProjectIcons, hasProjectIcon } from '@/components/icons'
import { getDictionary } from '@/get-dictionary'
import type { Locale } from '@/i18n-config'
import { i18n } from '@/i18n-config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function HomePage({ params }: { params: { lang: Locale } }) {
  const { lang } = await params;
  const projects = getProjects(lang)
  const dictionary = await getDictionary(lang)

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {dictionary.home.title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {dictionary.home.subtitle}
        </p>
      </section>

      <section className="mt-16">
        <h2 className="font-headline text-3xl font-bold text-center mb-10">
          {dictionary.home.projects_header}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.slug} href={`/${lang}/projects/${project.slug}`} className="group block">
              <Card className="h-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 border-border/50 hover:border-primary/50">
                <CardHeader className="flex-row items-center gap-4">
                  {hasProjectIcon(project.slug) && (
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <ProjectIcons slug={project.slug} className="h-8 w-8" />
                    </div>
                  )}
                  <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.shortDescription}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
