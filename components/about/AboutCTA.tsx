'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import CalendlyButton from '@/components/shared/CalendlyButton';
import styles from './AboutCTA.module.scss';

export default function AboutCTA() {
  const t = useTranslations();
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.cta} ${isVisible ? styles.visible : ''} ${locale === 'ar' ? styles.rtl : styles.ltr}`}
    >
      {/* Decorative elements */}
      <div className={styles.decorativeGlow1} />
      <div className={styles.decorativeGlow2} />
      <div className={styles.decorativeCards} />

      <div className="container">
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            {t('about.cta.badge')}
          </div>

          <div className={styles.header}>
            <div className={styles.accent} />
            <h2 className={styles.title}>{t('about.cta.title')}</h2>
            <p className={styles.subtitle}>{t('about.cta.subtitle')}</p>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>Satisfaction</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>6 Weeks</span>
              <span className={styles.statLabel}>Avg Launch</span>
            </div>
          </div>

          <div className={styles.actions}>
            <CalendlyButton className={styles.buttonPrimary}>
              <span className={styles.buttonText}>{t('about.cta.button')}</span>
              <span className={styles.arrow}>→</span>
            </CalendlyButton>
            <Link href={`/${locale}/projects`} className={styles.buttonSecondary}>
              {t('about.cta.secondary')}
            </Link>
          </div>

          <p className={styles.footnote}>{t('about.cta.footnote')}</p>
        </div>
      </div>
    </section>
  );
}
