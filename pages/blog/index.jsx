import { useState } from 'react';
import { getPosts, postsCacheKey } from '../../api-routes/posts';
import useSWR from 'swr';
import Heading from '@components/heading';
import styles from './blog.module.css';
import Link from 'next/link';
import { ThreeDots } from 'react-loader-spinner';
import Button from '@components/button';

export default function Blog() {
  const { data, error } = useSWR(postsCacheKey, getPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const filteredData = data?.data || [];

  // Reverse the filteredData array
  const reversedData = [...filteredData].reverse();

  // Filter the data based on the search query
  const filteredDisplayData = reversedData.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Determine how many posts to display
  const displayData = showAll
    ? filteredDisplayData
    : filteredDisplayData.slice(0, 6);

  if (error) {
    return <div>Error loading data. Please try again later.</div>;
  }

  if (!data) {
    return (
      <div className={styles.loader}>
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
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <Heading>All Articles</Heading>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {displayData.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
        >
          <div className={styles.post}>
            <p>{post.title}</p>
            <time className={styles.date}>{post.created_at}</time>
          </div>
        </Link>
      ))}
      {filteredDisplayData.length > 6 && (
        <div>
          {showAll ? (
            <Button onClick={() => setShowAll(false)}>Show Less</Button>
          ) : (
            <Button onClick={() => setShowAll(true)}>Show More</Button>
          )}
        </div>
      )}
    </section>
  );
}
