'use client';

import { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { projects, type ProjectCategory } from '@/data/projects';
import styles from './ProjectsGrid.module.scss';

const categories: { key: ProjectCategory; labelKey: string }[] = [
  { key: 'web', labelKey: 'projects.categories.web' },
  { key: 'mobile', labelKey: 'projects.categories.mobile' },
  { key: 'uiux', labelKey: 'projects.categories.uiux' },
  { key: 'ecommerce', labelKey: 'projects.categories.ecommerce' },
  { key: 'saas', labelKey: 'projects.categories.saas' },
  { key: 'dashboard', labelKey: 'projects.categories.dashboard' },
];

export default function ProjectsGrid() {
  const locale = useLocale();
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.category.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section className={styles.section} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.kicker}>✦ {t('projects.kicker')}</span>
          <h1 className={styles.title}>{t('projects.title')}</h1>
          <p className={styles.subtitle}>{t('projects.subtitle')}</p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            {t('projects.categories.all')}
          </button>
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`${styles.filterBtn} ${activeFilter === cat.key ? styles.active : ''}`}
              onClick={() => setActiveFilter(cat.key)}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project, idx) => {
            const thumbnail = project.media[0];
            const isVideo = thumbnail.type === 'video';
            
            return (
              <article
                key={project.id}
                className={styles.card}
                style={{ '--card-index': idx } as React.CSSProperties}
              >
                <Link href={`/${locale}/projects/${project.slug}`} className={styles.cardLink}>
                  {/* Media */}
                  <div className={styles.mediaWrapper}>
                    {isVideo ? (
                      <video
                        className={styles.media}
                        poster={thumbnail.thumbnail}
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      >
                        <source src={thumbnail.url} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={thumbnail.url}
                        alt={thumbnail.alt || t(project.titleKey)}
                        fill
                        className={styles.media}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    
                    {/* Type Badge */}
                    <div className={styles.typeBadge}>
                      {project.type === 'live' && '🌐'}
                      {project.type === 'video' && '🎥'}
                      {project.type === 'case-study' && '📋'}
                      {project.type === 'design' && '🎨'}
                    </div>

                    {/* Overlay */}
                    <div className={styles.overlay}>
                      <span className={styles.viewProject}>
                        {t('projects.viewProject')} →
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={styles.content}>
                    <div className={styles.meta}>
                      {project.category.map(cat => (
                        <span key={cat} className={styles.tag}>
                          {t(`projects.categories.${cat}`)}
                        </span>
                      ))}
                    </div>
                    <h3 className={styles.projectTitle}>{t(project.titleKey)}</h3>
                    <p className={styles.projectDesc}>{t(project.descriptionKey)}</p>
                    
                    {project.technologies && (
                      <div className={styles.tech}>
                        {project.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className={styles.techBadge}>{tech}</span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className={styles.techBadge}>+{project.technologies.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
