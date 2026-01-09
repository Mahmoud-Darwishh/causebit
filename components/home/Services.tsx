'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import styles from './Services.module.scss';

export default function Services() {
  const t = useTranslations();
  const servicesRef = useRef<HTMLDivElement>(null);
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

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  const serviceItems = t.raw('services.items');

  return (
    <section className={`${styles.services} ${isVisible ? styles.visible : ''}`} ref={servicesRef}>
      <div className="container-fluid px-0">
        <div className={styles.header}>
          <span className={styles.kicker}>{t('services.kicker')}</span>
          <h2 className={styles.title}>{t('services.title')}</h2>
          <p className={styles.subtitle}>{t('services.subtitle')}</p>
        </div>

        <div className="row g-4 mt-5">
          {serviceItems &&
            serviceItems.map((service: any, idx: number) => (
              <div
                key={`service-${idx}`}
                className={`col-lg-6 col-xl-3 ${styles.serviceCol}`}
                style={{ '--delay': `${idx * 0.1}s` } as any}
              >
                <div className={`${styles.serviceCard} ${isVisible ? styles.cardVisible : ''}`}>
                  <div className={styles.iconBox}>
                    <span className={styles.icon} aria-hidden="true">
                      {service.icon}
                    </span>
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
