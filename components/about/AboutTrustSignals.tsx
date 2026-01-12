'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import styles from './AboutTrustSignals.module.scss';

export default function AboutTrustSignals() {
  const t = useTranslations('about.trustSignals');
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

  const certifications = t.raw('certifications');
  const credentials = t.raw('credentials');
  const achievements = t.raw('achievements');

  return (
    <section className={`${styles.trustSignals} ${isVisible ? styles.visible : ''}`} ref={sectionRef}>
      <div className="container-fluid px-0">
        <div className={styles.header}>
          <span className={styles.kicker}>{t('kicker')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.content}>
          {/* Certifications */}
          <div className={`${styles.column} ${isVisible ? styles.columnVisible : ''}`} style={{ '--delay': '0.1s' } as any}>
            <h3 className={styles.columnTitle}>{t('certifications_title')}</h3>
            <div className={styles.badgeGroup}>
              {certifications &&
                certifications.map((cert: any, idx: number) => (
                  <div key={`cert-${idx}`} className={styles.badge}>
                    <span className={styles.badgeIcon}>{cert.icon}</span>
                    <span className={styles.badgeText}>{cert.name}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Credentials */}
          <div className={`${styles.column} ${isVisible ? styles.columnVisible : ''}`} style={{ '--delay': '0.2s' } as any}>
            <h3 className={styles.columnTitle}>{t('credentials_title')}</h3>
            <div className={styles.credentialsList}>
              {credentials &&
                credentials.map((cred: any, idx: number) => (
                  <div key={`cred-${idx}`} className={styles.credentialItem}>
                    <div className={styles.credentialIcon}>{cred.icon}</div>
                    <div className={styles.credentialContent}>
                      <p className={styles.credentialName}>{cred.name}</p>
                      <p className={styles.credentialDesc}>{cred.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Achievements */}
          <div className={`${styles.column} ${isVisible ? styles.columnVisible : ''}`} style={{ '--delay': '0.3s' } as any}>
            <h3 className={styles.columnTitle}>{t('achievements_title')}</h3>
            <div className={styles.achievementsList}>
              {achievements &&
                achievements.map((ach: any, idx: number) => (
                  <div key={`ach-${idx}`} className={styles.achievementItem}>
                    <div className={styles.achievementIcon}>{ach.icon}</div>
                    <div>
                      <p className={styles.achievementValue}>{ach.value}</p>
                      <p className={styles.achievementLabel}>{ach.label}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
