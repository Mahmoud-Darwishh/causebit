'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './ContactFAQ.module.scss';

export default function ContactFAQ() {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = t.raw('contact.faq.items');

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <h2 className={styles.title}>{t('contact.faq.title')}</h2>

        <div className={styles.faqContainer}>
          {faqs &&
            faqs.map((faq: any, idx: number) => (
              <div
                key={`faq-${idx}`}
                className={`${styles.faqItem} ${openIndex === idx ? styles.open : ''}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={openIndex === idx}
                >
                  <span>{faq.question}</span>
                  <span className={styles.icon}>+</span>
                </button>
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
