'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import styles from './AboutTrust.module.scss';

export default function AboutTrust() {
  const t = useTranslations('about.trust');
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

  const trustItems = t.raw('items');

  return (
    <section className={`${styles.trust} ${isVisible ? styles.visible : ''}`} ref={sectionRef}>
      <div className="container-fluid px-0">
        <div className={styles.header}>
          <span className={styles.kicker}>{t('kicker')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className="row g-4 mt-5">
          {trustItems &&
            trustItems.map((item: any, idx: number) => (
              <div
                key={`trust-${idx}`}
                className="col-md-6 col-lg-3"
                style={{ '--delay': `${idx * 0.1}s` } as any}
              >
                <div className={`${styles.trustCard} ${isVisible ? styles.cardVisible : ''}`}>
                  <div className={styles.iconBox}>
                    <span className={styles.icon} aria-hidden="true">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className={styles.trustTitle}>{item.title}</h3>
                  <p className={styles.trustDesc}>{item.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
