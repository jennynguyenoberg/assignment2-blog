import Button from "@components/button";
import styles from "./comment.module.css";

import { removeComment, commentsCacheKey } from "@/api-routes/comments";
import useSWRMutation from "swr/mutation";

export default function Comment({ comment, created_at, author, id }) {
  const { trigger: removeCommentTrigger } = useSWRMutation(commentsCacheKey,
    removeComment,
  );

  const handleDelete = async () => {
    const { error } = await removeCommentTrigger(id);
    
    if (error) {
      console.log(error);
    }
  };
  console.log({ id });
  
  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{created_at}</time>

      {/* The Delete part should only be showed if you are authenticated and you are the author */}
      <div className={styles.buttonContainer}>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}
