export const SITE_URL = 'https://causebit.tech';
export const BRAND_NAME = 'Causebit';
export const BRAND_TAGLINE = 'Code with Cause';
export const DEFAULT_DESCRIPTION =
  'Causebit is a software house delivering modern web solutions with strong SEO, clean UI, and mobile support.';

export const SUPPORTED_LOCALES = ['en', 'ar'] as const;

export function absoluteUrl(path: string = '/') {
  try {
    return new URL(path, SITE_URL).toString();
  } catch {
    return `${SITE_URL}${path}`;
  }
}

export function alternatesFor(locale: string) {
  return {
    canonical: absoluteUrl(`/${locale}`),
    languages: {
      en: absoluteUrl('/en'),
      ar: absoluteUrl('/ar'),
    },
  } as const;
}

export const ogImage = {
  url: absoluteUrl('/brand/causebit-og.png'),
  width: 1200,
  height: 630,
  alt: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
};