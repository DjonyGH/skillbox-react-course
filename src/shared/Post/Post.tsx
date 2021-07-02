import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { useCloseOnClickOut } from '../../hooks/useCloseOnClickOut'
import { useCommentsData } from '../../hooks/useCommentsData'
import { Comment } from './Comment'
import styles from './post.css'
import { CommentFormContainer } from './CommentFormContainer'

interface IPostProps {
  id?: string
  title?: string
  onClose: () => void
}

export function Post({ id, title, onClose }: IPostProps) {
  const [ref] = useCloseOnClickOut(onClose)

  const refCommentInput = useRef<HTMLTextAreaElement>(null)

  const [comments] = useCommentsData(id)

  const node = document.querySelector('.modal_root')
  if (!node) return null

  console.log('Post render')

  return ReactDOM.createPortal(
    <div className={styles.modal} ref={ref}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        <p>Есть над чем задуматься: тщательные исследования конкурентов представляют собой не что иное</p>
        <p>Есть над чем задуматься: тщательные исследования конкурентов представляют собой не что иное</p>
        <p>Есть над чем задуматься: тщательные исследования конкурентов представляют собой не что иное</p>
      </div>
      <CommentFormContainer refCommentInput={refCommentInput} />
      {comments.length > 0 &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            author={comment.author}
            text={comment.text}
            created={comment.created}
            refCommentInput={refCommentInput}
          />
        ))}
    </div>,
    node
  )
}
