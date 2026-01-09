import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PrivacyHero from '@/components/privacy/PrivacyHero';
import PrivacyContent from '@/components/privacy/PrivacyContent';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'privacy' });

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

export default function PrivacyPage() {
  return (
    <main>
      <PrivacyHero />
      <PrivacyContent />
    </main>
  );
}
