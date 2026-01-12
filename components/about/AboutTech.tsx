'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import styles from './AboutTech.module.scss';

export default function AboutTech() {
  const t = useTranslations('about.tech');
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

  const categories = t.raw('categories');

  return (
    <section className={`${styles.tech} ${isVisible ? styles.visible : ''}`} ref={sectionRef}>
      <div className="container-fluid px-0">
        <div className={styles.header}>
          <span className={styles.kicker}>{t('kicker')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className="row g-4 mt-5">
          {categories &&
            categories.map((category: any, idx: number) => (
              <div
                key={`category-${idx}`}
                className="col-md-6 col-lg-4"
                style={{ '--delay': `${idx * 0.1}s` } as any}
              >
                <div className={`${styles.categoryCard} ${isVisible ? styles.cardVisible : ''}`}>
                  <div className={styles.categoryHeader}>
                    <span className={styles.categoryIcon}>{category.icon}</span>
                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                  </div>
                  <div className={styles.techList}>
                    {category.items.map((tech: string, techIdx: number) => (
                      <span key={`tech-${idx}-${techIdx}`} className={styles.techItem}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
