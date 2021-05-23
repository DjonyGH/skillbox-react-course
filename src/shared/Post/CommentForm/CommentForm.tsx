import React, { ChangeEvent, FormEvent, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TRootState, updateComment } from '../../../strore'
import { commentContext } from '../../context/commentContext'
import styles from './commentform.css'

interface ICommentForm {
  refCommentInput: React.RefObject<HTMLTextAreaElement>
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: (e: FormEvent) => void
}

export const CommentForm: React.FC<ICommentForm> = ({ value, onChange, onSubmit, refCommentInput }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea ref={refCommentInput} className={styles.input} value={value} onChange={onChange}></textarea>
      <div className={styles.controls}>
        <div className={styles.buttons}></div>
        <button type='submit' className={styles.button}>
          Комментировать
        </button>
      </div>
    </form>
  )
}
