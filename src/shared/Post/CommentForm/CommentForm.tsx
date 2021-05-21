import React, { ChangeEvent, FormEvent, useContext } from "react";
import { commentContext } from "../../context/commentContext";
import styles from "./commentform.css";

interface ICommentForm {
  refCommentInput: React.RefObject<HTMLTextAreaElement>;
}

export const CommentForm: React.FC<ICommentForm> = ({ refCommentInput }) => {
  const { value, onChange } = useContext(commentContext);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        ref={refCommentInput}
        className={styles.input}
        value={value}
        onChange={handleChange}
      ></textarea>
      <div className={styles.controls}>
        <div className={styles.buttons}></div>
        <button type="submit" className={styles.button}>
          Комментировать
        </button>
      </div>
    </form>
  );
};
