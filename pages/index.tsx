import Heading from '@components/heading';
import RecentPosts from '@/pages/recent-posts';
import { ThreeDots } from 'react-loader-spinner';
import { useState, useEffect } from 'react';

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
      <Heading>Home</Heading>
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
    </>
  );
}
