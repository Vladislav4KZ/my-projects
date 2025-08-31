
"use client"

import { getProjectBySlug } from '@/lib/projects'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, use } from 'react'

import type { Locale } from '@/i18n-config'
import type { Dictionary } from '@/get-dictionary'
import { getDictionary } from '@/get-dictionary'
import type { Project } from '@/lib/projects'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { CommentSection } from '@/components/comment-section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectIcons, hasProjectIcon } from '@/components/icons'
import { ImageLightbox } from '@/components/image-lightbox'


export default function ProjectPage({ params }: { params: Promise<{ lang: Locale, slug: string }> }) {
  const { lang, slug } = use(params);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const proj = getProjectBySlug(slug, lang)
      if (!proj) {
        // We can't use notFound() directly in client component,
        // but we can ensure project is undefined and handle it in the JSX.
        // A better approach might involve a wrapper or a different structure if this were complex.
      }
      const dict = await getDictionary(lang)
      setProject(proj)
      setDictionary(dict)
    }
    fetchData()
  }, [lang, slug])

  const openLightbox = (index: number) => {
    setLightboxStartIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  // A simple loading state
  if (!project || !dictionary) {
    if (project === undefined && dictionary) {
        notFound();
    }
    return <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-5xl">Loading...</div>;
  }

  const renderDescription = (description: string) => {
    const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    const boldRegex = /\*\*(.*?)\*\*/g;
  
    return description.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <div key={index} className="h-4" />;
      }
  
      if (urlRegex.test(line.trim())) {
        return (
          <p key={index}>
            <a href={line.trim()} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              {line.trim()}
            </a>
          </p>
        );
      }
      
      if (line.trim().startsWith('- ')) {
        return <li key={index} className="list-disc list-inside ml-4">{line.substring(2)}</li>;
      }

      if (line.includes('**')) {
        const parts = line.split(boldRegex);
        // Check if the entire line is bold
        if (parts.length === 3 && parts[0] === '' && parts[2] === '') {
            return <div key={index} className="mb-1 text-foreground"><strong>{parts[1]}</strong></div>;
        }
        return (
          <div key={index} className="mb-1">
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong className="text-foreground" key={i}>{part}</strong> : <span key={i}>{part}</span>
            )}
          </div>
        );
      }
  
      const parts = line.split(/:(.*)/s);
      if (parts.length > 1 && parts[0].trim().length > 0) {
        return (
          <div key={index} className="mb-1">
            <strong className="font-semibold text-card-foreground">{parts[0]}:</strong>
            <span>{parts[1]}</span>
          </div>
        );
      }
  
      return <div key={index}>{line}</div>;
    });
  }

  const renderInstallation = (steps: string[]) => {
    const titleRegex = /.+:$/;
    return steps.map((step, index) => {
        if (step.trim() === '') {
            return <div key={index} className="h-4" />;
        }
      if (titleRegex.test(step)) {
        return (
          <p key={index} className="font-bold text-foreground mt-4 first:mt-0">
            {step}
          </p>
        );
      }
      return (
        <p key={index} className="text-muted-foreground">
          {step}
        </p>
      );
    });
  }
  
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-5xl">
      <header className="mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            {hasProjectIcon(project.slug) && (
                <div className="bg-primary/10 p-3 sm:p-4 rounded-lg text-primary flex-shrink-0 self-start">
                    <ProjectIcons slug={project.slug} className="h-10 w-10 sm:h-12 sm:w-12" />
                </div>
            )}
            <div className="flex-1">
                 <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    {project.title}
                </h1>
                <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
                    {project.shortDescription}
                </p>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div/>
            <div className="flex-shrink-0">
                <Button asChild size="lg">
                    <Link href={project.downloadUrl}>
                        <Download className="mr-2 h-5 w-5" />
                        {dictionary.project.download}
                    </Link>
                </Button>
            </div>
        </div>
      </header>
      
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 h-auto">
            <TabsTrigger value="description">{dictionary.project.description}</TabsTrigger>
            {project.installation && <TabsTrigger value="installation">{dictionary.project.installation}</TabsTrigger>}
            {project.changelog && <TabsTrigger value="changelog">{dictionary.project.changelog}</TabsTrigger>}
            {project.screenshots.length > 0 && <TabsTrigger value="screenshots">{dictionary.project.screenshots}</TabsTrigger>}
        </TabsList>

        <TabsContent value="description">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{dictionary.project.description}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{renderDescription(project.description)}</div>
                </CardContent>
            </Card>
        </TabsContent>

        {project.installation && (
            <TabsContent value="installation">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">{dictionary.project.installation}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                           {renderInstallation(project.installation)}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        )}

        {project.changelog && (
            <TabsContent value="changelog">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">{dictionary.project.changelog}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {project.changelog.map((entry, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">{entry.date}</span>
                            </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4">
                                <ul className="space-y-2 list-disc pl-5">
                                    {entry.changes.map((change, changeIndex) => (
                                        <li key={changeIndex} className="text-muted-foreground">{change}</li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>
                    </CardContent>
                </Card>
            </TabsContent>
        )}

        {project.screenshots.length > 0 && (
            <TabsContent value="screenshots">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">{dictionary.project.screenshots}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <Carousel className="w-full">
                        <CarouselContent>
                        {project.screenshots.map((screenshot, index) => (
                            <CarouselItem key={index} onClick={() => openLightbox(index)} className="cursor-pointer">
                            <div className="aspect-video relative overflow-hidden rounded-lg">
                                <Image
                                src={screenshot.src.startsWith('https://') ? `${screenshot.src}?random=${index}` : screenshot.src}
                                alt={screenshot.alt}
                                data-ai-hint={screenshot.hint}
                                fill
                                className="object-cover"
                                />
                            </div>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        <CarouselPrevious className="ml-16" />
                        <CarouselNext className="mr-16" />
                    </Carousel>
                    </CardContent>
                </Card>
            </TabsContent>
        )}
      </Tabs>


      <div className="space-y-12 mt-12">
        {project.addons && project.addons.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{dictionary.project.addons}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {project.addons.map((addon, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-start justify-between rounded-lg border p-4">
                            <div className="flex-1 mb-4 sm:mb-0">
                                <h3 className="font-semibold text-lg">{addon.title}</h3>
                                <p className="text-muted-foreground mt-1">{addon.description}</p>
                            </div>
                            <Button asChild className="sm:ml-6">
                                <Link href={addon.downloadUrl}>
                                    <Download className="mr-2 h-4 w-4" />
                                    {dictionary.project.download}
                                </Link>
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        )}

        <CommentSection dictionary={dictionary.project} lang={lang} />
      </div>

       {lightboxOpen && (
        <ImageLightbox
          images={project.screenshots}
          startIndex={lightboxStartIndex}
          onClose={closeLightbox}
          dictionary={dictionary.project}
        />
      )}
    </div>
  )
}

    