'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import styles from './Stats.module.scss';

type StatItem = {
  value: number;
  suffix?: string;
  prefix?: string;
  unit?: string;
  label: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(m.matches);
    onChange();
    m.addEventListener?.('change', onChange);
    return () => m.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function Stats() {
  const t = useTranslations('stats');
  const locale = useLocale();
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLElement | null>(null);

  const items = useMemo<StatItem[]>(() => {
    const raw = t.raw('items') as Array<any>;
    return raw.map((r) => ({
      value: Number(r.value ?? 0),
      suffix: r.suffix ?? undefined,
      prefix: r.prefix ?? undefined,
      unit: r.unit ?? undefined,
      label: String(r.label ?? ''),
    }));
  }, [t]);

  const [progress, setProgress] = useState<number[]>(() => items.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    if (reducedMotion) {
      setProgress(items.map(() => 1));
      setHasStarted(true);
      return;
    }

    const node = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setHasStarted(true);
            io.disconnect();
            break;
          }
        }
      },
      {root: null, threshold: 0.25}
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reducedMotion, items.length]);

  useEffect(() => {
    if (!hasStarted) return;
    if (reducedMotion) return;
    const start = performance.now();
    const duration = 1200;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      setProgress((prev) => prev.map(() => eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, reducedMotion]);

  return (
    <section ref={containerRef} className={styles.section} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.kicker}>✦ {t('kicker')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          {t('subtitle') && <p className={styles.subtitle}>{t('subtitle')}</p>}
        </div>
        <div className="row g-3 g-md-4">
          {items.map((item, idx) => {
            const current = Math.round(item.value * progress[idx]);
            const numberText = `${item.prefix ?? ''}${current}${item.suffix ?? ''}`;
            const display = item.unit ? `${numberText}` : numberText;
            return (
              <div className="col-6 col-md-3" key={`${item.label}-${idx}`}>
                <article className={`${styles.card} ${hasStarted ? styles.isVisible : styles.reveal}`}>
                  <div className={styles.value} aria-hidden="true">
                    {display}
                    {item.unit && <span className={styles.unit}>&nbsp;{item.unit}</span>}
                  </div>
                  <span className={styles.srOnly}>
                    {`${item.prefix ?? ''}${item.value}${item.suffix ?? ''}${item.unit ? ' ' + item.unit : ''} ${item.label}`}
                  </span>
                  <div className={styles.label}>{item.label}</div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
