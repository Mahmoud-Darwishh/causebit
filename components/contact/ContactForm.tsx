'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useToast } from '@/components/shared/ToastProvider';
import styles from './ContactForm.module.scss';

export default function ContactForm() {
  const t = useTranslations();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showToast(t('contact.form.required'), 'error');
      return;
    }

    // Construct email body with form data
    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    // Create mailto link
    const mailtoLink = `mailto:mahmoudd.business@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open mailto
    window.location.href = mailtoLink;
    
    // Show success message
    showToast(t('contact.form.successMessage'), 'success');
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section className={styles.formSection}>
      <div className="container">
        <h2 className={styles.title}>{t('contact.form.title')}</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-md-6">
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('contact.form.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.form.namePlaceholder')}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('contact.form.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.form.emailPlaceholder')}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className="col-12">
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('contact.form.subject')}</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact.form.subjectPlaceholder')}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className="col-12">
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('contact.form.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.form.messagePlaceholder')}
                  className={styles.textarea}
                  rows={6}
                  required
                />
              </div>
            </div>

            <div className="col-12">
              {status === 'success' && (
                <div className={styles.successMessage}>
                  ✓ {t('contact.form.success')}
                </div>
              )}

              <button
                type="submit"
                className={styles.submitButton}
              >
                {t('contact.form.submit')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
