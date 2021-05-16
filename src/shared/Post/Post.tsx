import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useCloseOnClickOut } from '../../hooks/useCloseOnClickOut'
import styles from './post.css'

interface IPostProps {
  title?: string
  onClose: () => void
}

export function Post({ title, onClose }: IPostProps) {
  // const ref = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const handleClick = (e: MouseEvent) => {
  //     if (e.target instanceof Node && !ref.current?.contains(e.target)) onClose?.()
  //   }
  //   document.addEventListener('click', handleClick)
  //   return () => {
  //     removeEventListener('click', handleClick)
  //   }
  // }, [])

  const [ref] = useCloseOnClickOut(onClose)

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
    </div>,
    node
  )
}
