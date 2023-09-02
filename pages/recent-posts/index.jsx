import Link from 'next/link';
import styles from './recentPosts.module.css';
import Heading from '@components/heading';

import useSWR from 'swr';
import { getPosts, postsCacheKey } from '../../api-routes/posts';

export default function RecentPosts() {
  const { data: { data = [] } = {} } = useSWR(postsCacheKey, getPosts);
  return (
    <section>
      <Heading>Recent Articles</Heading>
      {data?.map((post) => (
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