import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useCloseOnClickOut } from '../../hooks/useCloseOnClickOut'
import { useCommentsData } from '../../hooks/useCommentsData'
import { CommentForm } from './CommentForm'
import { Comment } from './Comment'
import styles from './post.css'

interface IPostProps {
  id?: string
  title?: string
  onClose: () => void
}

export function Post({ id, title, onClose }: IPostProps) {
  const [ref] = useCloseOnClickOut(onClose)

  // const [comments] = useCommentsData(id)

  const node = document.querySelector('.modal_root')
  if (!node) return null
  return ReactDOM.createPortal(
    <div className={styles.modal} ref={ref}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        <p>Есть над чем задуматься: тщательные исследования конкурентов представляют собой не что иное</p>
        <p>Есть над чем задуматься: тщательные исследования конкурентов представляют собой не что иное</p>
        <p>Есть над чем задуматься: тщательные исследования конкурентов представляют собой не что иное</p>
      </div>
      <CommentForm />
      {/* {comments.length > 0 &&
        comments.map((comment) => <Comment author={comment.author} text={comment.text} created={comment.created} />)} */}
    </div>,
    node
  )
}
