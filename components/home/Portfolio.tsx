"use client";

import {useEffect, useRef} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import styles from './Portfolio.module.scss';

type Card = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export default function Portfolio() {
  const t = useTranslations('portfolio');
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cards: Card[] = [
    {id: 'c1', title: t('cards.0.title'), description: t('cards.0.desc'), href: '#'},
    {id: 'c2', title: t('cards.1.title'), description: t('cards.1.desc'), href: '#'},
    {id: 'c3', title: t('cards.2.title'), description: t('cards.2.desc'), href: '#'}
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const items = Array.from(containerRef.current.querySelectorAll('[data-reveal]')) as HTMLElement[];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add(styles.isVisible));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add(styles.isVisible);
            io.unobserve(e.target);
          }
        }
      },
      {root: null, threshold: 0.2}
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.kicker}>✦ {t('kicker')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
          <div className={styles.ctaRow}>
            <a href="#projects" className={styles.cta} aria-label={t('cta')}>
              → {t('cta')}
            </a>
          </div>
        </div>
        <div className={`row ${styles.grid}`} ref={containerRef} id="projects">
          {cards.map((card, index) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={card.id}>
              <article className={`${styles.card} ${styles.reveal}`} data-reveal>
                <div className={styles.cardThumbnail}>
                  <img 
                    src={`/projects/thumb-${index + 1}.jpg`}
                    alt={card.title}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.badge}>Portfolio</span>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.description}</p>
                  <a href={card.href} className={styles.cardLink} aria-label={card.title}>
                    {t('viewProject')}
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
