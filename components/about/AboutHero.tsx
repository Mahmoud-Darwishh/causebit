'use client';

import { useTranslations, useLocale } from 'next-intl';
import styles from './AboutHero.module.scss';

export default function AboutHero() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className={`${styles.hero} ${locale === 'ar' ? styles.rtl : styles.ltr}`}>
      <div className="container-fluid px-0">
        <div className={styles.content}>
          <h1 className={styles.title}>{t('about.hero.title')}</h1>
          <p className={styles.tagline}>{t('about.hero.subtitle')}</p>
          <p className={styles.description}>{t('about.hero.description')}</p>
        </div>
      </div>
    </section>
  );
}
