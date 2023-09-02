import { useRouter } from 'next/router';
import styles from './blog-post.module.css';
import Comments from './partials/comments';
import AddComment from './partials/add-comment';
import Button from '@components/button';
import Heading from '@components/heading';
import BlogImageBanner from '@components/blog-image-banner';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { removePost, getPost, postsCacheKey } from '@/api-routes/posts';

export default function BlogPost() {
  const { trigger: deletePostTrigger } = useSWRMutation(
    postsCacheKey,
    removePost,
    {},
  );

  const router = useRouter();
  const { slug } = router.query;

  const { data: { data: post = {} } = {}, error, isValidating } = useSWR(
    slug ? `${postsCacheKey}${slug}` : null,
    () => getPost({ slug }),
  );

  const handleDeletePost = async () => {
    const postId = post.id;
    const { error } = await deletePostTrigger(postId);
    console.log({ id: post.id });
    if (!error) {
      router.push('/blog');
    }
  };

  const handleEditPost = async () => {
    router.push(`/blog/${slug}/edit`);
  };

  if (isValidating) {
    // Data is still loading
    return <p>Loading...</p>;
  }

  if (error) {
    // Error occurred while loading data
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <>
      <section className={styles.container}>
        <Heading>{post.title}</Heading>
        {post?.image && <BlogImageBanner src={post.image} alt={post.title} />}
        <div className={styles.dateContainer}>
          <time className={styles.date}>{post.created_at}</time>
          <div className={styles.border} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        <span className={styles.author}>Author: {post.author}</span>

        {/* The Delete & Edit part should only be showed if you are authenticated and you are the author */}
        <div className={styles.buttonContainer}>
          <Button onClick={handleDeletePost}>Delete</Button>
          <Button onClick={handleEditPost}>Edit</Button>
        </div>
      </section>

      <Comments postId={post.id} />

      {/* This component should only be displayed if a user is authenticated */}
      <AddComment postId={post.id} />
    </>
  );
}