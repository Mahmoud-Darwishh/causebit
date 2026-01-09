'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './PrivacyContent.module.scss';

interface PrivacySection {
  id: string;
  title: string;
  content?: string;
  list?: string[];
  subsections?: Array<{
    title: string;
    content: string;
  }>;
  contactInfo?: {
    email: string;
    address: string;
  };
}

export default function PrivacyContent() {
  const t = useTranslations('privacy');
  const sections = t.raw('sections') as PrivacySection[];
  const [expandedId, setExpandedId] = useState<string | null>('introduction');

  const toggleSection = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <nav className={styles.toc}>
          <h3>Contents</h3>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className={expandedId === section.id ? styles.active : ''}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className={styles.main}>
          {sections.map((section) => (
            <article
              key={section.id}
              className={styles.section}
              data-section={section.id}
            >
              <button
                className={styles.sectionHeader}
                onClick={() => toggleSection(section.id)}
              >
                <h2>{section.title}</h2>
                <span
                  className={styles.toggleIcon}
                  aria-hidden="true"
                >
                  {expandedId === section.id ? '−' : '+'}
                </span>
              </button>

              {expandedId === section.id && (
                <div className={styles.sectionContent}>
                  {section.content && (
                    <p className={styles.text}>{section.content}</p>
                  )}

                  {section.list && (
                    <ul className={styles.list}>
                      {section.list.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.subsections && (
                    <div className={styles.subsections}>
                      {section.subsections.map((subsection, idx) => (
                        <div key={idx} className={styles.subsection}>
                          <h3>{subsection.title}</h3>
                          <p>{subsection.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.contactInfo && (
                    <div className={styles.contactInfo}>
                      <p>
                        <strong>Email:</strong>{' '}
                        <a href={`mailto:${section.contactInfo.email}`}>
                          {section.contactInfo.email}
                        </a>
                      </p>
                      <p>
                        <strong>Address:</strong> {section.contactInfo.address}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </main>
      </div>
    </section>
  );
}
