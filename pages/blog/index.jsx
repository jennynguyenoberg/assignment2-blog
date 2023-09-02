import Link from 'next/link';
import styles from './blog.module.css';
import Heading from '@components/heading';

import useSWR from 'swr';
import { getPosts, postsCacheKey } from '../../api-routes/posts';
import { useState } from 'react';

export default function Blog() {
  const { data: { data = [] } = {} } = useSWR(postsCacheKey, getPosts);
  
  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <Heading>All Articles</Heading>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredData.map((post) => (
        <Link
          key={post.slug}
          className={styles.link}
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col">
            <p>{post.title}</p>
            <time className={styles.date}>{post.created_at}</time>
          </div>
        </Link>
      ))}
    </section>
  );
};