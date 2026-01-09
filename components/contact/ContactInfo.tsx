'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import styles from './ContactInfo.module.scss';

export default function ContactInfo() {
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

  const contactItems = [
    {
      icon: '📧',
      label: t('contact.info.email.label'),
      value: t('contact.info.email.value'),
      href: 'mailto:hello@causebit.com',
    },
    {
      icon: '💬',
      label: t('contact.info.whatsapp.label'),
      value: t('contact.info.whatsapp.value'),
      href: 'https://wa.me/201234567890',
    },
    {
      icon: '📍',
      label: t('contact.info.location.label'),
      value: t('contact.info.location.value'),
      href: '#',
    },
    {
      icon: '⏱️',
      label: t('contact.info.hours.label'),
      value: t('contact.info.hours.value'),
      href: '#',
    },
  ];

  return (
    <section className={`${styles.info} ${isVisible ? styles.visible : ''}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{t('contact.info.title')}</h2>
          <p className={styles.subtitle}>{t('contact.info.subtitle')}</p>
        </div>

        <div className="row g-4 mt-5">
          {contactItems.map((item, idx) => (
            <div key={`contact-${idx}`} className="col-md-6 col-lg-3">
              <a
                href={item.href}
                className={`${styles.contactCard} ${isVisible ? styles.cardVisible : ''}`}
                style={{ '--delay': `${idx * 0.1}s` } as any}
              >
                <div className={styles.icon}>{item.icon}</div>
                <h3 className={styles.label}>{item.label}</h3>
                <p className={styles.value}>{item.value}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
