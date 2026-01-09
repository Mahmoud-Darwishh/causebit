'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import styles from './Breadcrumb.module.scss';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const locale = useLocale();
  const t = useTranslations();

  if (!items || items.length === 0) return null;

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {/* Home Link */}
        <li className={styles.item}>
          <Link href={`/${locale}`} className={styles.link}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className={styles.homeLabel}>{t('navigation.home')}</span>
          </Link>
        </li>

        {/* Dynamic Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className={styles.item}>
              <span className={styles.separator} aria-hidden="true">/</span>
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
