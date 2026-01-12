'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import styles from './Hero.module.scss';

type PrimaryCollectible = 'strategy' | 'design' | 'development';
type CollectibleType = PrimaryCollectible | 'boost' | 'core';

type Collectible = {
  id: string;
  kind: CollectibleType;
  label: string;
  icon: string;
  value: number;
  position: { x: number; y: number };
  drift: number;
  expiresAt?: number;
};

type Objective = {
  type: PrimaryCollectible;
  target: number;
  progress: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const randomPosition = () => ({ x: 14 + Math.random() * 72, y: 16 + Math.random() * 70 });
const WIN_THRESHOLD = 60;

export default function Hero() {
  const locale = useLocale();
  const t = useTranslations();
  const heroRef = useRef<HTMLDivElement>(null);
  const gameCanvasRef = useRef<HTMLDivElement>(null);
  const lastAnimationFrameRef = useRef<number | null>(null);
  const idleCallbackRef = useRef<number | null>(null);
  const renderTimeoutRef = useRef<number | null>(null);
  const fallbackRenderTimeoutRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [starPositions, setStarPositions] = useState<Array<{ left: number; top: number; delay: number }> | null>(null);
  const [shouldRenderGame, setShouldRenderGame] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const baseCollectibles = useMemo<Collectible[]>(
    () => [
      { id: 'strategy', kind: 'strategy', label: t('hero.game.items.strategy'), icon: '🎯', value: 4, position: { x: 50, y: 50 }, drift: 8 },
      { id: 'design', kind: 'design', label: t('hero.game.items.design'), icon: '🎨', value: 4, position: { x: 50, y: 50 }, drift: 8 },
      { id: 'development', kind: 'development', label: t('hero.game.items.development'), icon: '⚙️', value: 4, position: { x: 50, y: 50 }, drift: 8 },
    ],
    [t]
  );

  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [bonusOrbs, setBonusOrbs] = useState<Collectible[]>([]);
  const [objective, setObjective] = useState<Objective>({ type: 'strategy', progress: 0, target: 3 });

  useEffect(() => {
    // Generate star positions once on client to avoid hydration mismatch
    const positions = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setStarPositions(positions);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallax = scrolled * 0.5;
      setParallaxOffset(parallax);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isVisible || shouldRenderGame) return;

    const render = () => setShouldRenderGame(true);
    const idle = (window as any).requestIdleCallback;

    if (idle) {
      idleCallbackRef.current = idle(() => {
        idleCallbackRef.current = null;
        render();
      }, { timeout: 900 });
    } else {
      renderTimeoutRef.current = window.setTimeout(render, 120);
    }

    fallbackRenderTimeoutRef.current = window.setTimeout(render, 1200);

    return () => {
      const cancelIdle = (window as any).cancelIdleCallback;
      if (idleCallbackRef.current && cancelIdle) {
        cancelIdle(idleCallbackRef.current);
        idleCallbackRef.current = null;
      }
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
        renderTimeoutRef.current = null;
      }
      if (fallbackRenderTimeoutRef.current) {
        clearTimeout(fallbackRenderTimeoutRef.current);
        fallbackRenderTimeoutRef.current = null;
      }
    };
  }, [isVisible, shouldRenderGame]);

  useEffect(() => {
    setCollectibles(baseCollectibles.map(item => ({ ...item, position: randomPosition(), drift: 6 + Math.random() * 6 })));
    setObjective({ type: 'strategy', progress: 0, target: 3 });
  }, [baseCollectibles]);

  const pickNextObjective = useCallback(
    (current: PrimaryCollectible) => {
      const options = baseCollectibles.map(item => item.kind as PrimaryCollectible).filter(kind => kind !== current);
      const nextType = options[Math.floor(Math.random() * options.length)] ?? current;
      setObjective({ type: nextType, progress: 0, target: clamp(objective.target + 1, 3, 6) });
    },
    [baseCollectibles, objective.target]
  );

  useEffect(() => {
    // Gentle repositioning loop
    const interval = window.setInterval(() => {
      setCollectibles(prev => prev.map(item => ({ ...item, position: randomPosition(), drift: 6 + Math.random() * 6 })));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Spawn a temporary boost orb
    const spawnInterval = window.setInterval(() => {
      const now = Date.now();
      setBonusOrbs(prev => {
        const active = prev.filter(orb => !orb.expiresAt || orb.expiresAt > now);
        if (active.length > 0) return active;

        const boost: Collectible = {
          id: `boost-${now}`,
          kind: 'boost',
          label: t('hero.game.items.boost'),
          icon: '⚡',
          value: 7,
          position: randomPosition(),
          drift: 10,
          expiresAt: now + 8000,
        };

        return [...active, boost];
      });
    }, 6500);

    const cleanupInterval = window.setInterval(() => {
      const now = Date.now();
      setBonusOrbs(prev => prev.filter(orb => !orb.expiresAt || orb.expiresAt > now));
    }, 1200);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(cleanupInterval);
    };
  }, [t]);

  const safeT = useCallback(
    (id: string, fallback: string) => {
      try {
        return t(id);
      } catch (error) {
        return fallback;
      }
    },
    [t]
  );

  const spawnFeedback = useCallback(
    (x: number, y: number, text: string) => {
      if (!gameCanvasRef.current) return;

      const floatingText = document.createElement('div');
      floatingText.className = styles.floatingText;
      floatingText.textContent = text;
      floatingText.style.left = x + 'px';
      floatingText.style.top = y + 'px';
      gameCanvasRef.current.appendChild(floatingText);

      setTimeout(() => floatingText.remove(), 700);

      const ring = document.createElement('div');
      ring.className = styles.interactionRing;
      ring.style.left = x + 'px';
      ring.style.top = y + 'px';
      ring.style.transform = 'translate(-50%, -50%)';
      gameCanvasRef.current.appendChild(ring);
      setTimeout(() => ring.remove(), 400);

      for (let i = 0; i < 4; i++) {
        const particle = document.createElement('div');
        particle.className = styles.particle;
        particle.textContent = '✦';
        const angle = (Math.PI * 2 * i) / 4;
        const tx = Math.cos(angle) * 90;
        const ty = Math.sin(angle) * 90;
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        gameCanvasRef.current.appendChild(particle);
        setTimeout(() => particle.remove(), 900);
      }
    },
    []
  );

  const handleCollectibleClick = (e: MouseEvent<HTMLDivElement>, item: Collectible) => {
    if (!gameCanvasRef.current) return;

    const rect = gameCanvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStreak(prev => prev + 1);
    const gained = item.value + (item.kind === 'boost' ? 4 : 0);
    setScore(prev => {
      const next = prev + gained;
      if (next >= WIN_THRESHOLD) setIsWinner(true);
      return next;
    });

    if (item.kind !== 'boost' && item.kind !== 'core') {
      setObjective(prev => {
        if (prev.type !== item.kind) return prev;
        const newProgress = prev.progress + 1;
        if (newProgress >= prev.target) {
          setScore(s => {
            const withBonus = s + 10;
            if (withBonus >= WIN_THRESHOLD) setIsWinner(true);
            return withBonus;
          });
          pickNextObjective(prev.type);
          return prev;
        }
        return { ...prev, progress: newProgress };
      });
    }

    setCollectibles(prev =>
      prev.map(c =>
        c.id === item.id
          ? { ...c, position: randomPosition(), drift: 6 + Math.random() * 6 }
          : c
      )
    );
    setBonusOrbs(prev => prev.filter(orb => orb.id !== item.id));

    spawnFeedback(x, y, `+${gained}`);
  };

  const animateDrift = useCallback(() => {
    lastAnimationFrameRef.current = requestAnimationFrame(() => {
      setCollectibles(prev =>
        prev.map(item => ({
          ...item,
          position: {
            x: clamp(item.position.x + Math.sin(Date.now() / 1000 + item.drift) * 0.08, 10, 90),
            y: clamp(item.position.y + Math.cos(Date.now() / 1000 + item.drift) * 0.08, 10, 90),
          },
        }))
      );
      animateDrift();
    });
  }, []);

  useEffect(() => {
    animateDrift();
    return () => {
      if (lastAnimationFrameRef.current) cancelAnimationFrame(lastAnimationFrameRef.current);
    };
  }, [animateDrift]);

  const renderCollectible = (item: Collectible) => (
    <div
      key={item.id}
      className={`${styles.collectible} ${item.kind === 'boost' ? styles.boostCollectible : ''}`}
      style={{ '--x': `${item.position.x}%`, '--y': `${item.position.y}%` } as CSSProperties}
      onClick={e => handleCollectibleClick(e, item)}
      role="button"
      aria-label={t('hero.game.collect', { item: item.label })}
    >
      <span aria-hidden="true" className={styles.collectibleIcon}>{item.icon}</span>
      <span className={styles.collectibleText}>{item.label}</span>
    </div>
  );

  const resetGame = useCallback(() => {
    setScore(0);
    setStreak(0);
    setIsWinner(false);
    setObjective({ type: 'strategy', progress: 0, target: 3 });
    setCollectibles(baseCollectibles.map(item => ({ ...item, position: randomPosition(), drift: 6 + Math.random() * 6 })));
    setBonusOrbs([]);
  }, [baseCollectibles]);

  const coreCollectible: Collectible = {
    id: 'core',
    kind: 'core',
    label: t('hero.game.items.core'),
    icon: '⚛️',
    value: 5,
    position: { x: 50, y: 50 },
    drift: 8,
  };

  const objectiveLabel = `${t('hero.game.objective')}: ${t('hero.game.items.' + objective.type)} ${objective.progress}/${objective.target}`;
  const winTitle = safeT('hero.game.winTitle', 'Winner');
  const winSubtitle = safeT('hero.game.winSubtitle', 'You reached the target with Causebit.');
  const winCta = safeT('hero.game.winCta', 'Talk to Causebit');
  const winReplay = safeT('hero.game.playAgain', 'Play again');

  return (
    <section className={`${styles.hero} ${locale === 'ar' ? styles.rtl : styles.ltr}`} ref={heroRef}>
      <div className="container-fluid px-0">
        <div className="row align-items-center g-0">
          <div className={`col-lg-6 order-lg-1 order-1 ${styles.content}`}>
            <div className={`${styles.contentWrapper} px-4 px-lg-5 py-5 py-lg-0`}>
              <span className={`${styles.badge} ${isVisible ? styles.visible : ''}`}>{t('hero.badge')}</span>
              <h1 className={`${styles.title} ${isVisible ? styles.visible : ''}`}>{t('hero.title')}</h1>
              <p className={`${styles.subtitle} ${isVisible ? styles.visible : ''}`}>{t('hero.subtitle')}</p>

              <div className={`${styles.highlightList} ${isVisible ? styles.visible : ''}`}>
                {t.raw('hero.highlights').map((item: string, idx: number) => (
                  <span className={styles.highlight} key={item} style={{ '--delay': `${idx * 0.1}s` } as any}>
                    ✦ {item}
                  </span>
                ))}
              </div>

              <div className={`${styles.ctaGroup} ${isVisible ? styles.visible : ''}`}>
                <Link href={`/${locale}/projects`} className={`${styles.btn} ${styles.btnPrimary}`}>
                  <span>{t('hero.cta')}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href={`/${locale}/contact`} className={`${styles.btn} ${styles.btnSecondary}`}>
                  <span>{t('hero.secondary')}</span>
                </Link>
              </div>

              <div className={`${styles.statsRow} ${isVisible ? styles.visible : ''}`}>
                {Object.values(t.raw('hero.stats')).map((stat: any, idx: number) => (
                  <div className={styles.statItem} key={`stat-${idx}`}>
                    <div className={styles.statValue}>
                      <span className={styles.statNumber}>{stat.value}</span>
                    </div>
                    <p className={styles.statLabel}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`col-lg-6 order-lg-2 order-2 ${styles.visual}`}>
            <div 
              className={styles.visualContent}
            >
              {shouldRenderGame ? (
                <div className={`${styles.gameCanvas} ${isVisible ? styles.active : ''}`} ref={gameCanvasRef}>
                  <div className={styles.starfield}>
                    {starPositions && starPositions.map((pos, i) => (
                      <div
                        key={`star-${i}`}
                        className={styles.star}
                        style={{
                          '--star-left': `${pos.left}%`,
                          '--star-top': `${pos.top}%`,
                          '--delay': `${pos.delay}s`,
                        } as any}
                      />
                    ))}
                  </div>

                  <svg className={styles.energyBeams} viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                      <linearGradient id="beamGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'rgba(0, 172, 195, 0.6)' }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(0, 172, 195, 0.1)' }} />
                      </linearGradient>
                    </defs>
                    <line x1="300" y1="250" x2="300" y2="30" stroke="url(#beamGradient1)" strokeWidth="2" className={styles.beam1} />
                    <line x1="300" y1="250" x2="80" y2="250" stroke="url(#beamGradient1)" strokeWidth="2" className={styles.beam2} />
                    <line x1="300" y1="250" x2="520" y2="250" stroke="url(#beamGradient1)" strokeWidth="2" className={styles.beam3} />
                  </svg>

                  <div className={styles.gameElements}>
                    <div
                      className={styles.energyCore}
                      onClick={e => handleCollectibleClick(e, coreCollectible)}
                      role="button"
                      aria-label={t('hero.game.collect', { item: coreCollectible.label })}
                    >
                      <div className={styles.coreSymbol} aria-hidden="true">⚛️</div>
                    </div>

                    {[...collectibles, ...bonusOrbs].map(renderCollectible)}
                  </div>

                  <div className={styles.gameHud} aria-live="polite">
                    <div className={styles.hudCard}>
                      <span className={styles.hudLabel}>{t('hero.game.score')}</span>
                      <span className={styles.hudValue}>{score}</span>
                      <div className={styles.progressTrack}>
                        <span className={styles.progressFill} style={{ width: `${clamp((score / WIN_THRESHOLD) * 100, 0, 100)}%` }} />
                      </div>
                    </div>
                    <div className={`${styles.hudCard} ${styles.objectiveCard}`}>
                      <span className={styles.hudLabel}>{objectiveLabel}</span>
                      <div className={styles.progressTrack}>
                        <span className={styles.progressFill} style={{ width: `${(objective.progress / objective.target) * 100}%` }} />
                      </div>
                    </div>
                    <div className={styles.hudCard}>
                      <span className={styles.hudLabel}>{t('hero.game.streak')}</span>
                      <span className={styles.hudValue}>{streak}</span>
                    </div>
                  </div>

                  <div className={styles.gameScore}>
                    <span>{t('hero.game.hits')}: {score}</span>
                    <span className={styles.streakBadge}>{t('hero.game.streak')}: {streak}</span>
                  </div>

                  {isWinner && (
                    <div className={styles.winBanner}>
                      <div>
                        <p className={styles.winKicker}>{winTitle}</p>
                        <h3 className={styles.winHeading}>{winSubtitle}</h3>
                      </div>
                      <Link href={`/${locale}/contact`} className={styles.winCta}>
                        {winCta}
                      </Link>
                      <button type="button" className={styles.winReplay} onClick={resetGame}>
                        {winReplay}
                      </button>
                    </div>
                  )}

                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
                </div>
              ) : (
                <div className={`${styles.gameCanvas} ${styles.gamePlaceholder} ${isVisible ? styles.active : ''}`} aria-hidden="true">
                  <div className={styles.placeholderGlow} />
                  <div className={styles.placeholderPulse} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
