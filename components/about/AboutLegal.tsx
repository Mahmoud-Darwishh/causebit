'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import styles from './AboutLegal.module.scss';

export default function AboutLegal() {
  const t = useTranslations('about.legal');
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

  const legalItems = t.raw('items');

  return (
    <section className={`${styles.legal} ${isVisible ? styles.visible : ''}`} ref={sectionRef}>
      <div className="container-fluid px-0">
        <div className={styles.header}>
          <span className={styles.kicker}>{t('kicker')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className="row g-4 mt-5">
          {legalItems &&
            legalItems.map((item: any, idx: number) => (
              <div
                key={`legal-${idx}`}
                className="col-md-6"
                style={{ '--delay': `${idx * 0.1}s` } as any}
              >
                <div className={`${styles.legalCard} ${isVisible ? styles.cardVisible : ''}`}>
                  <div className={styles.iconBox}>
                    <span className={styles.icon}>{item.icon}</span>
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.legalTitle}>{item.title}</h3>
                    <p className={styles.legalDesc}>{item.description}</p>
                    {item.badges && (
                      <div className={styles.badges}>
                        {item.badges.map((badge: string, badgeIdx: number) => (
                          <span key={`badge-${idx}-${badgeIdx}`} className={styles.badge}>
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
