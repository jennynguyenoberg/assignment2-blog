import { useRouter } from 'next/router';
import styles from './blog-post.module.css';
import Comments from './partials/comments';
import AddComment from './partials/add-comment';
import Button from '@components/button';
import Heading from '@components/heading';
import BlogImageBanner from '@components/blog-image-banner';
import RecentPosts from '../../recent-posts';
import { ThreeDots } from 'react-loader-spinner';

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

  const {
    data: { data: post = {} } = {},
    error,
    isValidating,
  } = useSWR(slug ? `${postsCacheKey}${slug}` : null, () => getPost({ slug }));

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

  const handleGoBack = () => {
    router.push('/blog'); // This will navigate to the /blog page
  };

  const isLoggedIn = true; // Set to true if the user is authenticated
  const isAuthor = isLoggedIn && post.author === 'currentUser';

  if (isValidating) {
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

  if (error) {
    // Error occurred while loading data
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <>
      <section className={styles.container}>
        <button className={styles.backButton} onClick={handleGoBack}>
          Go Back to Blog
        </button>
        <Heading>{post.title}</Heading>
        <div className={styles.dateContainer}>
          <time className={styles.date}>{post.created_at}</time>
          <div className={styles.border} />
        </div>
        {post?.image && <BlogImageBanner src={post.image} alt={post.title} />}
        <div
          className={styles.postBody}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
        <span className={styles.author}>Author: {post.author}</span>
        {isLoggedIn && isAuthor && (
          <div>
            <Button onClick={handleDeletePost}>Delete</Button>
            <Button onClick={handleEditPost}>Edit</Button>
          </div>
        )}

        <Comments postId={post.id} />

        {isLoggedIn && <AddComment postId={post.id} />}
      </section>
      <div className={styles.subContainer}>
        <RecentPosts />
      </div>
    </>
  );
}
