import React from 'react';
import styles from './footer.module.css';

export default function Footer() {
  const navItems = {
    '/about': {
      name: 'Copyright 2023 © Jenny Nguyen Öberg',
    },
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {Object.entries(navItems).map(([path, { name }]) => (
          <span
            key={path}
            href={path}
            className={styles.linkName}
          >
            {name}
          </span>
        ))}
      </div>
    </footer>
  );
}