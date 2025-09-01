
"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LangSwitcher } from "@/components/lang-switcher"
import type { Locale } from "@/i18n-config"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"

type Dictionary = {
  title: string;
  home: string;
}

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <div {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1000" height="1000" viewBox="0 0 50 50" className="dark:hidden">
        <path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1000" height="1000" viewBox="0 0 50 50" style={{"fill":"#FFFFFF"}} className="hidden dark:block">
        <path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"></path>
      </svg>
    </div>
);


const BoostyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <div {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="30 40 180 220" className="h-full w-full dark:hidden">
      <path d="M44.3,164.5L76.9,51.6H127l-10.1,35c-0.1,0.2-0.2,0.4-0.3,0.6L90,179.6h24.8c-10.4,25.9-18.5,46.2-24.3,60.9   c-45.8-0.5-58.6-33.3-47.4-72.1 M90.7,240.6l60.4-86.9h-25.6l22.3-55.7c38.2,4,56.2,34.1,45.6,70.5   c-11.3,39.1-57.1,72.1-101.7,72.1C91.3,240.6,91,240.6,90.7,240.6z" fill="#242B2C"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="30 40 180 220" className="h-full w-full hidden dark:block">
      <path d="M44.3,164.5L76.9,51.6H127l-10.1,35c-0.1,0.2-0.2,0.4-0.3,0.6L90,179.6h24.8c-10.4,25.9-18.5,46.2-24.3,60.9   c-45.8-0.5-58.6-33.3-47.4-72.1 M90.7,240.6l60.4-86.9h-25.6l22.3-55.7c38.2,4,56.2,34.1,45.6,70.5   c-11.3,39.1-57.1,72.1-101.7,72.1C91.3,240.6,91,240.6,90.7,240.6z" fill="#FFFFFF"/>
    </svg>
  </div>
);


export default function Header({ lang, dictionary }: { lang: Locale, dictionary: Dictionary }) {
  const isRussian = lang === 'ru';
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex sm:flex-1">
          <Link href={`/${lang}`} className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-lg sm:inline-block whitespace-nowrap">
              {dictionary.title}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 sm:flex-none">
          <nav className="flex items-center">
            <LangSwitcher />
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem
                  className="focus:bg-accent focus:text-accent-foreground md:focus:bg-accent md:focus:text-accent-foreground group"
                  onSelect={(e) => {
                    e.preventDefault();
                    window.open("https://t.me/vladislavprojects", "_blank");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <TelegramIcon className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Telegram</p>
                      {isRussian ? (
                        <p className="text-xs text-muted-foreground group-focus:text-accent-foreground">Блог с новостями о моих проектах</p>
                      ) : (
                        <p className="text-xs text-muted-foreground group-focus:text-accent-foreground">Blog with news about my projects</p>
                      )}
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="focus:bg-accent focus:text-accent-foreground md:focus:bg-accent md:focus:text-accent-foreground group"
                   onSelect={(e) => {
                    e.preventDefault();
                    window.open("https://boosty.to/rasstaman1337", "_blank");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <BoostyIcon className="h-5 w-5 flex-shrink-0" />
                    <div>
                        <p className="font-semibold">Boosty</p>
                        {isRussian ? (
                            <p className="text-xs text-muted-foreground group-focus:text-accent-foreground">Нравятся мои работы? Поддержите меня!</p>
                        ) : (
                            <p className="text-xs text-muted-foreground group-focus:text-accent-foreground">Like my work? Support me!</p>
                        )}
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
