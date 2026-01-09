'use client';

import { useEffect, useState } from 'react';
import styles from './Toast.module.scss';

type ToastProps = {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  };

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${isVisible ? styles.visible : ''}`}
      role="alert"
    >
      <div className={styles.icon}>{icons[type]}</div>
      <div className={styles.message}>{message}</div>
      <button
        className={styles.closeBtn}
        onClick={handleClose}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}
