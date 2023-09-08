import styles from './subheading.module.css';

export default function Subheading({ children }) {
  return <h4 className={styles.container}>{children}</h4>;
}