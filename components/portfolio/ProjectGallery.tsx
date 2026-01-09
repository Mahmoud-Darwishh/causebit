'use client';

import {useState} from 'react';
import Image from 'next/image';
import {ProjectMedia} from '@/data/projects';
import styles from './ProjectGallery.module.scss';

interface ProjectGalleryProps {
  media: ProjectMedia[];
  projectSlug: string;
}

export default function ProjectGallery({media, projectSlug}: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrevious();
  };

  return (
    <>
      <div className={styles.gallery}>
        {media.map((item, idx) => (
          <div
            key={idx}
            className={styles.galleryItem}
            onClick={() => openLightbox(idx)}
          >
            <div className={styles.imageWrapper}>
              {item.type === 'video' ? (
                <video
                  className={styles.thumbnail}
                  poster={item.thumbnail}
                  muted
                  playsInline
                >
                  <source src={item.url} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={item.url}
                  alt={item.alt || `${projectSlug}-${idx}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                />
              )}
              <div className={styles.overlay}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            className={styles.closeBtn}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            className={styles.navBtn + ' ' + styles.prevBtn}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            className={styles.navBtn + ' ' + styles.nextBtn}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            {media[currentIndex].type === 'video' ? (
              <video
                className={styles.lightboxMedia}
                poster={media[currentIndex].thumbnail}
                controls
                autoPlay
              >
                <source src={media[currentIndex].url} type="video/mp4" />
              </video>
            ) : (
              <div className={styles.lightboxImageWrapper}>
                <Image
                  src={media[currentIndex].url}
                  alt={media[currentIndex].alt || `${projectSlug}-${currentIndex}`}
                  fill
                  sizes="100vw"
                  className={styles.lightboxImage}
                  priority
                />
              </div>
            )}
          </div>

          <div className={styles.counter}>
            {currentIndex + 1} / {media.length}
          </div>

          <div className={styles.thumbnailStrip}>
            {media.map((item, idx) => (
              <div
                key={idx}
                className={`${styles.thumbnailItem} ${idx === currentIndex ? styles.active : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
              >
                {item.type === 'video' ? (
                  <video className={styles.thumbPreview} poster={item.thumbnail} muted>
                    <source src={item.url} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={item.url}
                    alt=""
                    fill
                    sizes="100px"
                    className={styles.thumbPreview}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
