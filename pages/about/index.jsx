import Heading from '@components/heading';
import styles from './about.module.css'

export default function About() {
  return (
    <div className={styles.container}>
      <Heading>About</Heading>
      <p>
        {' '}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus
        provident maxime labore ab voluptas sequi ratione quasi nulla fugit, vel
        eligendi facilis voluptatem cupiditate, maiores asperiores, eaque
        dolorem unde deserunt.
      </p>
    </div>
  );
}
