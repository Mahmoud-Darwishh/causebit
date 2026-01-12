'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoized active route checker
  const isActiveRoute = useCallback((path: string) => {
    if (path === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(path);
  }, [pathname, locale]);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu when resizing to desktop widths
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleLocale = useCallback(() => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  }, [locale, pathname, router]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);

  // Navigation items configuration
  const navItems = useMemo(() => [
    { href: `/${locale}`, label: t('nav.home'), key: 'home' },
    { href: `/${locale}/projects`, label: t('nav.projects'), key: 'projects' },
    { href: `/${locale}/about`, label: t('nav.about'), key: 'about' },
  ], [locale, t]);

  return (
    <header className={`${styles.header} ${locale === 'ar' ? styles.rtl : styles.ltr} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={`${styles.navbar} navbar navbar-expand-lg`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container-fluid px-4 px-lg-5">
          {/* Logo */}
          <Link href={`/${locale}`} className={styles.logo} aria-label="Causebit Home">
            <Image
              src="/brand/causebit-logo.png"
              alt="Causebit"
              width={220}
              height={56}
              priority
              className={styles.logoImg}
            />
          </Link>

          {/* Navbar Toggler for Mobile */}
          <button
            className={`navbar-toggler ${styles.toggler} ${isMenuOpen ? styles.open : ''}`}
            type="button"
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon" aria-hidden="true"></span>
          </button>

          {/* Navbar Links */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className={`navbar-nav ${locale === 'ar' ? 'me-auto' : 'ms-auto'}`} role="list">
              {navItems.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <li key={item.key} className="nav-item">
                    <Link 
                      href={item.href} 
                      className={`nav-link ${styles.navLink} ${isActive ? styles.active : ''}`}
                      onClick={closeMenu}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA + Language Switcher */}
            <div className={`${styles.headerActions} ${locale === 'ar' ? 'me-lg-0 ms-lg-5' : 'ms-lg-5'}`}>
              {/* Contact CTA */}
              <Link 
                href={`/${locale}/contact`} 
                className={styles.ctaBtn}
                onClick={closeMenu}
                aria-label="Contact us"
              >
                <span>{t('nav.contact')}</span>
                <svg 
                  className={styles.ctaIcon} 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path 
                    d="M8.5 3L13.5 8L8.5 13M13 8H2.5" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Language Switcher */}
              <div className={styles.languageSwitcher}>
                <button
                  onClick={toggleLocale}
                  className={styles.langBtn}
                  aria-label={`Switch language to ${locale === 'en' ? 'Arabic' : 'English'}`}
                  title={locale === 'en' ? 'العربية' : 'English'}
                  type="button"
                >
                  <svg 
                    className={styles.langIcon}
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path 
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.langCode}>{locale === 'en' ? 'AR' : 'EN'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
