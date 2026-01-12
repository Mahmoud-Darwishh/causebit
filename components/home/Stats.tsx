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

  // Drive counting based on scroll visibility (intersection ratio)
  const thresholds = useMemo(() => Array.from({ length: 101 }, (_, i) => i / 100), []);
  const animRef = useRef<number | null>(null);
  const currentRef = useRef<number>(0);
  const targetRef = useRef<number>(0);
  const itemsCountRef = useRef<number>(items.length);
  itemsCountRef.current = items.length;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (reducedMotion) {
      setProgress(items.map(() => 1));
      setHasStarted(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio; // 0..1
        const eased = easeOutCubic(Math.min(1, Math.max(0, ratio)));
        targetRef.current = eased;
        setHasStarted(ratio > 0.05);
      },
      { root: null, threshold: thresholds }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [items.length, reducedMotion, thresholds]);

  // Smoothly tween current progress toward the target for easy counting
  useEffect(() => {
    if (reducedMotion) return;
    const tick = () => {
      const cur = currentRef.current;
      const target = targetRef.current;
      const delta = target - cur;
      const step = 0.08; // smoothing factor
      const next = Math.abs(delta) < 0.001 ? target : cur + delta * step;
      if (next !== cur) {
        currentRef.current = next;
        const easedForDigits = next; // already eased target; keep linear tween to it
        setProgress(Array.from({ length: itemsCountRef.current }, () => easedForDigits));
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = null;
    };
  }, [reducedMotion]);

  // Determine decimals from provided value (e.g., 99.8 -> 1 decimal)
  const getDecimals = (value: number) => {
    const s = String(value);
    const idx = s.indexOf('.');
    return idx === -1 ? 0 : Math.min(3, s.length - idx - 1);
  };

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
            const decimals = getDecimals(item.value);
            const raw = item.value * progress[idx];
            const formatted = Number(raw).toLocaleString(locale, {
              minimumFractionDigits: decimals > 0 ? 1 : 0,
              maximumFractionDigits: decimals,
            });
            const numberText = `${item.prefix ?? ''}${formatted}${item.suffix ?? ''}`;
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
