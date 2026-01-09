'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import styles from './AboutValues.module.scss';

export default function AboutValues() {
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

  const values = t.raw('about.values.items');

  return (
    <section className={`${styles.values} ${isVisible ? styles.visible : ''}`} ref={sectionRef}>
      <div className="container-fluid px-0">
        <div className={styles.header}>
          <span className={styles.kicker}>{t('about.values.kicker')}</span>
          <h2 className={styles.title}>{t('about.values.title')}</h2>
        </div>

        <div className="row g-4 mt-5">
          {values &&
            values.map((value: any, idx: number) => (
              <div
                key={`value-${idx}`}
                className={`col-lg-6 col-xl-3 ${styles.valueCol}`}
                style={{ '--delay': `${idx * 0.1}s` } as any}
              >
                <div className={`${styles.valueCard} ${isVisible ? styles.cardVisible : ''}`}>
                  <div className={styles.iconBox}>{value.icon}</div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDesc}>{value.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
