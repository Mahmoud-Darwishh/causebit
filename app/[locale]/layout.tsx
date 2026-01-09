import type { Metadata } from 'next';
import { alternatesFor, SITE_URL, BRAND_NAME, BRAND_TAGLINE, DEFAULT_DESCRIPTION, ogImage } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LocaleHtml from '@/components/shared/LocaleHtml';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss';

const supportedLocales = ['en', 'ar'];

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (await params)?.locale || 'en';
  const isArabic = locale === 'ar';
  return {
    title: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    alternates: alternatesFor(locale),
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}`,
      title: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
      description: DEFAULT_DESCRIPTION,
      siteName: BRAND_NAME,
      images: [ogImage],
      locale: isArabic ? 'ar' : 'en',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
      description: DEFAULT_DESCRIPTION,
      images: [ogImage.url],
    },
  };
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  // Inform next-intl about the active locale for this request
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleHtml />
      <div dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, width: '100%' }}>{children}</main>
        <Footer />
        <WhatsAppButton />
      </div>
    </NextIntlClientProvider>
  );
}
