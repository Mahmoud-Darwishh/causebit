'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import styles from './ContactHero.module.scss';

export default function ContactHero() {
  const t = useTranslations();
  const locale = useLocale();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallax = scrolled * 0.4;
      setParallaxOffset(parallax);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={`${styles.hero} ${locale === 'ar' ? styles.rtl : styles.ltr}`}>
      <div className="container-fluid px-0">
        <div 
          className={styles.content}
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <h1 className={styles.title}>{t('contact.hero.title')}</h1>
          <p className={styles.tagline}>{t('contact.hero.subtitle')}</p>
          <p className={styles.description}>{t('contact.hero.description')}</p>
        </div>
      </div>
    </section>
  );
}
