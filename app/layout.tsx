import type { Metadata } from 'next';
import { inter, montserrat, cairo } from '@/lib/fonts';
import { SITE_URL, BRAND_NAME, BRAND_TAGLINE, DEFAULT_DESCRIPTION, ogImage, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${BRAND_NAME} - ${BRAND_TAGLINE}`,
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    siteName: BRAND_NAME,
    images: [ogImage],
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/brand/causebit.ico',
    shortcut: '/brand/causebit.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} ${cairo.variable}`}>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          // Organization + Website + SearchAction
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: BRAND_NAME,
              url: SITE_URL,
              slogan: BRAND_TAGLINE,
              description: DEFAULT_DESCRIPTION,
              logo: absoluteUrl('/brand/causebit-logo.png'),
              sameAs: [
                'https://www.linkedin.com/company/causebit',
                'https://github.com/causebit',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: BRAND_NAME,
              url: SITE_URL,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/en/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          // LocalBusiness (geo hint)
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: BRAND_NAME,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cairo',
                addressCountry: 'EG',
              },
              areaServed: ['Egypt', 'MENA', 'Global'],
              url: SITE_URL,
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
