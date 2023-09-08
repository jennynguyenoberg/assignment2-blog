import Heading from '@components/heading';
import RecentPosts from '@/pages/recent-posts';
import { ThreeDots } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import styles from '../styles/home.module.css'

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <main className={styles.container}>
        <Heading>{`Welcome to my blog. I'm Jenny, and this is where I channel my passion for programming and design. Here is where you'll find my latest experiments and insights neatly documented.`}</Heading>
        {loading ? ( // Render the loader while data is loading
          <ThreeDots
          height="80"
            width="80"
            radius={1}
            color="#cecece"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
            ) : (
              <RecentPosts />
              )}
      </main>
    </>
  );
}
