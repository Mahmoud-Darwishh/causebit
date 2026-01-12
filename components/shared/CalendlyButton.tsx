'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

interface CalendlyButtonProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function CalendlyButton({
  children,
  className,
  ariaLabel = 'Schedule time with us',
}: CalendlyButtonProps) {
  useEffect(() => {
    // Load Calendly script if not already loaded
    if (!window.Calendly) {
      const link = document.createElement('link');
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/mahmoudd-darwish/causebit-meetings',
      });
    }
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      role="button"
    >
      {children}
    </a>
  );
}
