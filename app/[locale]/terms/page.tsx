import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TermsHero from '@/components/terms/TermsHero';
import TermsContent from '@/components/terms/TermsContent';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'terms' });

  return {
    title: t('hero.title'),
    description: t('hero.description'),
    openGraph: {
      title: t('hero.title'),
      description: t('hero.description'),
      type: 'website',
    },
  };
}

export default function TermsPage() {
  return (
    <main>
      <TermsHero />
      <TermsContent />
    </main>
  );
}
