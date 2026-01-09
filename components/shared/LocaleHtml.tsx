"use client";

import {useEffect} from 'react';
import {useLocale} from 'next-intl';

export default function LocaleHtml() {
  const locale = useLocale();

  useEffect(() => {
    const root = document.documentElement;
    const isArabic = locale === 'ar';
    root.setAttribute('lang', isArabic ? 'ar' : 'en');
    root.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
    root.style.setProperty('--locale-scale', isArabic ? '1.06' : '1');
  }, [locale]);

  return null;
}
