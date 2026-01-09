import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function LocaleLayout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
