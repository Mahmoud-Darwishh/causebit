'use client';

import { useTranslations } from 'next-intl';
import styles from './TermsHero.module.scss';

export default function TermsHero() {
  const t = useTranslations('terms.hero');

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        <p className={styles.description}>{t('description')}</p>
      </div>
      <div className={styles.gradient} />
    </section>
  );
}
