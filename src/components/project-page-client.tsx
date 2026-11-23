'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/get-dictionary';
import type { Project } from '@/lib/projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CommentSection } from '@/components/comment-section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectIcons, hasProjectIcon } from '@/components/icons';
import { ImageLightbox } from '@/components/image-lightbox';
import { getScreenshotAlt } from '@/lib/screenshot-alt';

type ProjectPageClientProps = {
  project: Project;
  dictionary: Dictionary;
  lang: Locale;
};

function YandexDiskMark() {
  return (
    <span
      aria-hidden="true"
      className="grid h-6 w-6 shrink-0 place-items-center rounded bg-white text-base font-black leading-none text-[#e21b22]"
    >
      Я
    </span>
  );
}

function MegaMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-current">
      <path d="M2.5 20V4h4.4L12 10.8 17.1 4h4.4v16h-4.2v-9.1l-4.2 5.6h-2.1l-4.3-5.6V20H2.5Z" />
    </svg>
  );
}

export function ProjectPageClient({
  project,
  dictionary,
  lang,
}: ProjectPageClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxStartIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

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
            <a
              href={line.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              {line.trim()}
            </a>
          </p>
        );
      }

      if (line.trim().startsWith('- ')) {
        return (
          <li key={index} className="ml-4 list-disc list-inside">
            {line.substring(2)}
          </li>
        );
      }

      if (line.includes('**')) {
        const parts = line.split(boldRegex);
        if (parts.length === 3 && parts[0] === '' && parts[2] === '') {
          return (
            <div key={index} className="mb-1 text-foreground">
              <strong>{parts[1]}</strong>
            </div>
          );
        }
        return (
          <div key={index} className="mb-1">
            {parts.map((part, partIndex) =>
              partIndex % 2 === 1 ? (
                <strong className="text-foreground" key={partIndex}>
                  {part}
                </strong>
              ) : (
                <span key={partIndex}>{part}</span>
              ),
            )}
          </div>
        );
      }

      const parts = line.split(/:(.*)/s);
      if (parts.length > 1 && parts[0].trim().length > 0) {
        return (
          <div key={index} className="mb-1">
            <strong className="font-semibold text-card-foreground">
              {parts[0]}:
            </strong>
            <span>{parts[1]}</span>
          </div>
        );
      }

      return <div key={index}>{line}</div>;
    });
  };

  const renderInstallation = (steps: string[]) => {
    const titleRegex = /.+:$/;
    return steps.map((step, index) => {
      if (step.trim() === '') {
        return <div key={index} className="h-4" />;
      }
      if (titleRegex.test(step)) {
        return (
          <p key={index} className="mt-4 font-bold text-foreground first:mt-0">
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
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12">
        <div className="mb-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          {hasProjectIcon(project.slug) && (
            <div className="flex-shrink-0 self-start rounded-lg bg-primary/10 p-3 text-primary sm:p-4">
              <ProjectIcons
                slug={project.slug}
                className="h-10 w-10 sm:h-12 sm:w-12"
              />
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
          <div />
          <div className="flex-shrink-0">
            {project.downloadOptions?.length ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                {project.downloadOptions.map((option) => {
                  const isYandex = option.provider === 'yandex';

                  return (
                    <Button
                      key={option.provider}
                      asChild
                      size="lg"
                      className={
                        isYandex
                          ? 'w-full bg-[#ffdb4d] text-[#1f1f1f] hover:bg-[#f2cc3a] sm:w-auto'
                          : 'w-full bg-[#d9272e] text-white hover:bg-[#bd2026] sm:w-auto'
                      }
                    >
                      <Link href={option.url} target="_blank" rel="noopener noreferrer">
                        {isYandex ? <YandexDiskMark /> : <MegaMark />}
                        {isYandex
                          ? dictionary.project.downloadFromYandexDisk
                          : dictionary.project.downloadFromMega}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            ) : (
              <Button asChild size="lg">
                <Link href={project.downloadUrl}>
                  <Download className="mr-2 h-5 w-5" />
                  {dictionary.project.download}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="mb-8 grid h-auto w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="description">
            {dictionary.project.description}
          </TabsTrigger>
          {project.installation && (
            <TabsTrigger value="installation">
              {dictionary.project.installation}
            </TabsTrigger>
          )}
          {project.changelog && (
            <TabsTrigger value="changelog">
              {dictionary.project.changelog}
            </TabsTrigger>
          )}
          {project.screenshots.length > 0 && (
            <TabsTrigger value="screenshots">
              {dictionary.project.screenshots}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="description">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                {dictionary.project.description}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line leading-relaxed text-muted-foreground">
                {renderDescription(project.description)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {project.installation && (
          <TabsContent value="installation">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  {dictionary.project.installation}
                </CardTitle>
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
                <CardTitle className="font-headline">
                  {dictionary.project.changelog}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {project.changelog.map((entry, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            {entry.date}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <ul className="list-disc space-y-2 pl-5">
                          {entry.changes.map((change, changeIndex) => (
                            <li
                              key={changeIndex}
                              className="text-muted-foreground"
                            >
                              {change}
                            </li>
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
                <CardTitle className="font-headline">
                  {dictionary.project.screenshots}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full">
                  <CarouselContent>
                    {project.screenshots.map((screenshot, index) => (
                      <CarouselItem
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="cursor-pointer"
                      >
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                          <Image
                            src={screenshot.src}
                            alt={getScreenshotAlt(project.slug, screenshot.hint, lang, project.title)}
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

      <div className="mt-12 space-y-12">
        {project.addons && project.addons.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                {dictionary.project.addons}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {project.addons.map((addon, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start justify-between rounded-lg border p-4 sm:flex-row"
                >
                  <div className="mb-4 flex-1 sm:mb-0">
                    <h3 className="text-lg font-semibold">{addon.title}</h3>
                    <p className="mt-1 text-muted-foreground">
                      {addon.description}
                    </p>
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
          images={project.screenshots.map((screenshot) => ({
            ...screenshot,
            alt: getScreenshotAlt(project.slug, screenshot.hint, lang, project.title),
          }))}
          startIndex={lightboxStartIndex}
          onClose={closeLightbox}
          dictionary={dictionary.project}
        />
      )}
    </div>
  );
}
