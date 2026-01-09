'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { projects } from '@/data/projects';
import styles from './ProjectsSlider.module.scss';

export default function ProjectsSlider() {
  const t = useTranslations();
  const locale = useLocale();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Get featured projects
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlay || featuredProjects.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, featuredProjects.length]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  if (featuredProjects.length === 0) return null;

  return (
    <section className={`${styles.section} ${locale === 'ar' ? styles.rtl : styles.ltr}`}>
      <div className="container-fluid px-4 px-lg-5">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.kicker}>✦ {t('projects.kicker')}</span>
          <h2 className={styles.title}>{t('projects.title')}</h2>
          <p className={styles.subtitle}>{t('projects.subtitle')}</p>
        </div>

        {/* Slider Container */}
        <div className={styles.sliderWrapper}>
          <div className={styles.slider} ref={sliderRef}>
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
              >
                <Link href={`/${locale}/projects/${project.slug}`} className={styles.slideLink}>
                  {/* Project Image */}
                  <div className={styles.imageContainer}>
                    {project.media[0] && (
                      <Image
                        src={project.media[0].url}
                        alt={project.media[0].alt || 'Project preview'}
                        fill
                        className={styles.image}
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 60vw"
                        quality={75}
                      />
                    )}
                    <div className={styles.overlay}>
                      <div className={styles.overlayContent}>
                        <span className={styles.badge}>{t('projects.viewProject')}</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className={styles.content}>
                    <div className={styles.categoryTags}>
                      {project.category.slice(0, 2).map((cat) => (
                        <span key={cat} className={styles.tag}>
                          {t(`projects.categories.${cat}`)}
                        </span>
                      ))}
                    </div>
                    <h3 className={styles.projectTitle}>{t(project.titleKey)}</h3>
                    <p className={styles.projectDesc}>{t(project.descriptionKey)}</p>

                    {project.technologies && (
                      <div className={styles.techStack}>
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className={styles.tech}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.testimonial && (
                      <div className={styles.testimonial}>
                        <p className={styles.testimonialText}>"{t(project.testimonial.textKey)}"</p>
                        <p className={styles.testimonialAuthor}>
                          — {project.testimonial.author}, <span>{project.testimonial.role}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className={`${styles.navBtn} ${styles.prevBtn}`}
            aria-label="Previous project"
            title="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className={`${styles.navBtn} ${styles.nextBtn}`}
            aria-label="Next project"
            title="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots / Indicators */}
        <div className={styles.dots}>
          {featuredProjects.map((_, index) => (
            <button
              key={`dot-${index}`}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              title={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className={styles.ctaRow}>
          <Link href={`/${locale}/projects`} className={styles.cta}>
            → {t('projects.cta', { defaultValue: 'View all projects' })}
          </Link>
        </div>
      </div>
    </section>
  );
}
