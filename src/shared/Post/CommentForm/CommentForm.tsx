import React from 'react'
import styles from './commentform.css'

export function CommentForm() {
  return (
    <form className={styles.form}>
      <textarea className={styles.input}></textarea>
      <div className={styles.controls}>
        <div className={styles.buttons}></div>
        <button type='submit' className={styles.button}>
          Комментировать
        </button>
      </div>
    </form>
  )
}
