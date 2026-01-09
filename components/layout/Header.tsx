'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

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
            className={`navbar-toggler ${styles.toggler}`}
            type="button"
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            aria-label={t('nav.toggle')}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className={`navbar-nav gap-2 gap-lg-4 ${locale === 'ar' ? 'me-auto' : 'ms-auto'}`}>
              <li className="nav-item">
                <Link href={`/${locale}`} className={`nav-link ${styles.navLink}`} onClick={() => setIsMenuOpen(false)}>
                  <span>{t('nav.home')}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href={`/${locale}/projects`} className={`nav-link ${styles.navLink}`} onClick={() => setIsMenuOpen(false)}>
                  <span>{t('nav.projects')}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href={`/${locale}/about`} className={`nav-link ${styles.navLink}`} onClick={() => setIsMenuOpen(false)}>
                  <span>{t('nav.about')}</span>
                </Link>
              </li>
              
            </ul>

            {/* CTA + Language Switcher */}
            <div className={styles.headerActions}>
              {/* Contact CTA */}
              <Link href={`/${locale}/contact`} className={styles.ctaBtn}>
                {t('nav.contact')}
              </Link>

              {/* Language Switcher */}
              <div className={styles.languageSwitcher}>
                <button
                  onClick={toggleLocale}
                  className={styles.langBtn}
                  aria-label={`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`}
                  title={locale === 'en' ? 'العربية' : 'English'}
                >
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
