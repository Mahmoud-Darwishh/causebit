'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './TrustedBy.module.scss';

interface Logo {
  name: string;
  filename: string;
  width: number;
  height: number;
}

export default function TrustedBy() {
  const t = useTranslations('trustedBy');
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Add your company logos here
  const logos: Logo[] = [
    { name: 'Arab Academy for Science, Technology and Maritime Transport', filename: 'AAST.png', width: 160, height: 70 },
    { name: 'AASTEC', filename: 'AASTEC.png', width: 160, height: 70 },
    { name: 'Al Ahly SC', filename: 'Al_Ahly_SC.png', width: 160, height: 70 },
    { name: 'Arab AI', filename: 'ArabAI.png', width: 160, height: 70 },
    { name: 'Helwan University', filename: 'HU.jpg', width: 160, height: 70 },
    { name: 'ICCY', filename: 'ICCY.png', width: 160, height: 70 },
    { name: 'IEEE', filename: 'IEEEX.png', width: 160, height: 70 },
    { name: 'Mawaheb', filename: 'Mawaheb.jpg', width: 160, height: 70 },
    { name: 'Elmawkaa', filename: 'Mawkaa.jpeg', width: 160, height: 70 },
    { name: 'NYU Abu Dhabi', filename: 'NYUAD.png', width: 160, height: 70 },
    { name: 'Pharos University', filename: 'Pharos.png', width: 160, height: 70 },
    { name: 'Reutrans', filename: 'reutrans.png', width: 160, height: 70 },
  ];

  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    const handleMouseEnter = () => setIsAutoplay(false);
    const handleMouseLeave = () => setIsAutoplay(true);

    const slider = document.querySelector(`.${styles.sliderTrack}`);
    if (slider) {
      slider.addEventListener('mouseenter', handleMouseEnter);
      slider.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('mouseenter', handleMouseEnter);
        slider.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className={styles.section}>
      {/* Animated background elements */}
      <div className={styles.backgroundOrbs}>
        <div className={styles.orb + ' ' + styles.orb1}></div>
        <div className={styles.orb + ' ' + styles.orb2}></div>
        <div className={styles.orb + ' ' + styles.orb3}></div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        {/* Slider Container */}
        <div className={styles.sliderContainer}>
          <div 
            className={`${styles.sliderTrack} ${isAutoplay ? styles.autoplay : ''}`}
            style={{
              '--scroll-amount': 'calc(-25% - 20px)',
            } as React.CSSProperties}
          >
            {duplicatedLogos.map((logo, index) => (
              <div key={index} className={styles.logoItem}>
                <div className={styles.logoCard}>
                  <Image
                    src={`/logos/clients/${logo.filename}`}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className={styles.logo}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient fade overlays */}
        <div className={styles.fadeLeft}></div>
        <div className={styles.fadeRight}></div>
      </div>
    </section>
  );
}
