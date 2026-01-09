'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import styles from './PageTransition.module.scss';

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger fade-in animation
    if (contentRef.current) {
      contentRef.current.classList.remove(styles.fadeIn);
      // Force reflow
      void contentRef.current.offsetWidth;
      contentRef.current.classList.add(styles.fadeIn);
    }
  }, [pathname]);

  return (
    <div ref={contentRef} className={styles.pageTransition}>
      {children}
    </div>
  );
}
