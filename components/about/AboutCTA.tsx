'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import styles from './AboutCTA.module.scss';

export default function AboutCTA() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className={`${styles.cta} ${locale === 'ar' ? styles.rtl : styles.ltr}`}>
      <div className="container">
        <div className={styles.content}>
          <h2 className={styles.title}>{t('about.cta.title')}</h2>
          <p className={styles.subtitle}>{t('about.cta.subtitle')}</p>
          <Link href={`/${locale}/contact`} className={styles.button}>
            {t('about.cta.button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
