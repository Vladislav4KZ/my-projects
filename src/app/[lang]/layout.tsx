import type { Metadata } from 'next'
import { getDictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'


export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang)
  return {
    title: dictionary.header.title,
    description: dictionary.home.subtitle,
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: { lang: Locale }
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang)
  return (
    <div className="flex min-h-screen flex-col">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-1">{children}</main>
      <Footer dictionary={dictionary.footer} />
    </div>
  )
}
