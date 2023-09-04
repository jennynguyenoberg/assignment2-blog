import styles from './root-layout.module.css';
import Sidebar from '../sidebar';
import classNames from 'classnames';
import Footer from '../footer';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <div className={classNames(styles.container, inter.className)}>
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
}
