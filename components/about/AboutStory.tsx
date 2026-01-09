'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import styles from './AboutStory.module.scss';

export default function AboutStory() {
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

  const highlights = t.raw('about.story.highlights');

  return (
    <section className={`${styles.story} ${isVisible ? styles.visible : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className={styles.kicker}>{t('about.story.kicker')}</span>
            <h2 className={styles.title}>{t('about.story.title')}</h2>
            <p className={styles.subtitle}>{t('about.story.subtitle')}</p>
            <p className={styles.content}>{t('about.story.content')}</p>

            <ul className={styles.highlightList}>
              {highlights &&
                highlights.map((item: string, idx: number) => (
                  <li key={`highlight-${idx}`} className={styles.highlightItem}>
                    <span className={styles.checkmark}>✓</span>
                    {item}
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-lg-6">
            <div className={styles.imageBox}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.icon}>🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
