'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './HomeFAQ.module.scss';

interface FAQItem {
  question: string;
  answer: string;
}

export default function HomeFAQ() {
  const t = useTranslations('homeFaq');
  const items = t.raw('items') as FAQItem[];
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {items.map((item, idx) => (
            <div
              key={idx}
              className={styles.faqItem}
              onClick={() => toggleFAQ(idx)}
            >
              <button className={styles.question}>
                <span className={styles.questionText}>{item.question}</span>
                <span
                  className={styles.icon}
                  aria-hidden="true"
                >
                  {expandedId === idx ? '−' : '+'}
                </span>
              </button>

              {expandedId === idx && (
                <div className={styles.answer}>
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
