import React, { useEffect } from "react";
import styles from "./photo-comments-form.module.css";
import { Comment } from "@/actions/photo-get";
import { useFormState, useFormStatus } from "react-dom";
import EnviarIcon from "@/icons/enviar-icon";
import ErrorMessage from "@/components/helper/error-message";
import commentPost from "@/actions/comment-post";

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      <EnviarIcon />
    </button>
  );
}

const PhotoCommentsForm = ({
  id,
  setComments,
  single,
}: {
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  single: boolean;
}) => {
  const [state, action] = useFormState(commentPost, {
    ok: false,
    data: null,
    error: "",
  });

  const [comment, setComment] = React.useState("");

  useEffect(() => {
    if (state.ok && state.data) {
      setComments((comments) => [...comments, state.data]);
      setComment("");
    }
  }, [setComments, state]);

  return (
    <form
      action={action}
      className={`${styles.form} ${single ? styles.single : ""}`}
    >
      <input type="hidden" name="id" id="id" value={id} />
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  );
};

export default PhotoCommentsForm;
