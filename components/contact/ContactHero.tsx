'use client';

import { useTranslations, useLocale } from 'next-intl';
import styles from './ContactHero.module.scss';

export default function ContactHero() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className={`${styles.hero} ${locale === 'ar' ? styles.rtl : styles.ltr}`}>
      <div className="container-fluid px-0">
        <div className={styles.content}>
          <h1 className={styles.title}>{t('contact.hero.title')}</h1>
          <p className={styles.tagline}>{t('contact.hero.subtitle')}</p>
          <p className={styles.description}>{t('contact.hero.description')}</p>
        </div>
      </div>
    </section>
  );
}
