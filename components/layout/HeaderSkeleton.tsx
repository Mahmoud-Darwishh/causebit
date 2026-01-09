import styles from './Header.module.scss';

export default function HeaderSkeleton() {
  return (
    <header className={styles.header}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid px-4">
          <div className={styles.logo}>
            <div className="placeholder" style={{ width: '120px', height: '24px' }}></div>
          </div>
        </div>
      </nav>
    </header>
  );
}
