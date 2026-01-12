'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import styles from './AboutMetrics.module.scss';

export default function AboutMetrics() {
  const t = useTranslations('about.metrics');
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

  const metrics = t.raw('items');

  return (
    <section className={`${styles.metrics} ${isVisible ? styles.visible : ''}`} ref={sectionRef}>
      <div className="container-fluid px-0">
        <div className={styles.header}>
          <span className={styles.kicker}>{t('kicker')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className="row g-4 mt-5">
          {metrics &&
            metrics.map((metric: any, idx: number) => (
              <div
                key={`metric-${idx}`}
                className="col-6 col-md-4 col-lg-2"
                style={{ '--delay': `${idx * 0.08}s` } as any}
              >
                <div className={`${styles.metricCard} ${isVisible ? styles.cardVisible : ''}`}>
                  <div className={styles.metricNumber}>{metric.number}</div>
                  <div className={styles.metricLabel}>{metric.label}</div>
                  {metric.badge && <div className={styles.badge}>{metric.badge}</div>}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
