import Button from "@components/button";
import styles from "./comment.module.css";
import { useRef } from "react";

import { removeComment, commentsCacheKey } from "@/api-routes/comments";
import useSWRMutation from "swr/mutation";

export default function Comment({ comment, created_at, author, id }) {
  const formRef = useRef();
  const { trigger: removeCommentTrigger } = useSWRMutation(commentsCacheKey,
    removeComment,
  );

  const handleDelete = async () => {
    const { error } = await removeCommentTrigger(id);
    
    if (error) {
      console.log(error);
    }
    formRef.current.reset();
  };
  
  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{created_at}</time>

      {/* The Delete part should only be showed if you are authenticated and you are the author */}
      <form ref={formRef} className={styles.form}>
        <div className={styles.buttonContainer}>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </form>
    </div>
  );
}
