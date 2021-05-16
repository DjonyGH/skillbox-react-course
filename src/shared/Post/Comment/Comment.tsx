import React from 'react'
import { calcElapsedTime } from '../../../utils/react/calcElapsedTime'
import styles from './comments.css'

interface ICommentProps {
  id?: string
  author?: string
  text?: string
  created?: number
}

export const Comment: React.FC<ICommentProps> = ({ author, text, created }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.commentInfo}>
        <img
          className={styles.avatar}
          src='https://cdn.dribbble.com/users/6487119/avatars/normal/ea69d98ea3643959838e2ef4e421e107.png?1606648385&compress=1&resize=60x60'
          alt='avatar'
        />
        <a href='#user-url' className={styles.userName}>
          {author}
        </a>
        <span className={styles.createdAt}>{created ? calcElapsedTime(created) : ''}</span>
      </div>
      <div className={styles.commentText}>{text}</div>
      <div className={styles.commentControls}></div>
    </div>
  )
}
