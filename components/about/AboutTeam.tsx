'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import styles from './AboutTeam.module.scss';

export default function AboutTeam() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = t.raw('about.team.stats');

  return (
    <section className={`${styles.team} ${isVisible ? styles.visible : ''}`} ref={sectionRef}>
      <div className="container-fluid px-0">
        <div className={styles.header}>
          <span className={styles.kicker}>{t('about.team.kicker')}</span>
          <h2 className={styles.title}>{t('about.team.title')}</h2>
          <p className={styles.subtitle}>{t('about.team.subtitle')}</p>
        </div>

        <div className="row g-4 mt-5">
          {stats &&
            stats.map((stat: any, idx: number) => (
              <div
                key={`stat-${idx}`}
                className={`col-md-6 col-lg-3 ${styles.statCol}`}
                style={{ '--delay': `${idx * 0.1}s` } as any}
              >
                <div className={`${styles.statCard} ${isVisible ? styles.cardVisible : ''}`}>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
