import Link from 'next/link';
import styles from './recentPosts.module.css';
import Subheading from '@components/subheading';

import useSWR from 'swr';
import { getPosts, postsCacheKey } from '../../api-routes/posts';

export default function RecentPosts() {
  const { data: { data = [] } = {} } = useSWR(postsCacheKey, getPosts);

  // Get the last three posts by slicing the data array and then reverse the order
  const lastThreePosts = data.slice(-3).reverse();

  return (
    <section>
      <Subheading>Recent Articles</Subheading>
      {lastThreePosts.map((post) => (
        <Link
          key={post.slug}
          className={styles.link}
          href={`/blog/${post.slug}`}
        >
          <div className={styles.post}>
            <p>{post.title}</p>
            <time className={styles.date}>{post.created_at}</time>
          </div>
        </Link>
      ))}
    </section>
  );
}
