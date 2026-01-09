'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import styles from './AboutHero.module.scss';

export default function AboutHero() {
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
          <h1 className={styles.title}>{t('about.hero.title')}</h1>
          <p className={styles.tagline}>{t('about.hero.subtitle')}</p>
          <p className={styles.description}>{t('about.hero.description')}</p>
        </div>
      </div>
    </section>
  );
}
