import React, { useEffect, useRef, useState } from 'react'
import styles from './cardslist.css'
import { Card } from './Card'
import { usePostsData } from '../../hooks/usePostsData'

export interface IPostsContextData {
  id?: string
  author?: string
  previewImg?: string
  title?: string
  created?: number
  score?: number
  comments?: number
}

export function CardsList() {
  const endOfList = useRef<HTMLDivElement>(null)
  const [manualLoadMore, setManualLoadMore] = useState<boolean>(false)
  const { posts, loading, loadMore } = usePostsData(endOfList.current, manualLoadMore)

  // console.log('loadMore', loadMore)
  // console.log('manualLoadMore', manualLoadMore)

  useEffect(() => {
    if (loadMore) setManualLoadMore(false)
  }, [loadMore])

  return (
    <ul className={styles.cardList}>
      {posts.length < 1 && !loading && <div style={{ textAlign: 'center' }}>Нет ни одного поста</div>}
      {posts.map((post: IPostsContextData) => (
        <Card
          key={post.id}
          id={post.id}
          author={post.author}
          previewImg={post.previewImg}
          title={post.title}
          created={post.created}
          score={post.score}
          comments={post.comments}
        />
      ))}
      <div ref={endOfList} />
      {!loadMore && !manualLoadMore && (
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => setManualLoadMore(true)}>Загрузить еще</button>
        </div>
      )}
      {loading && <div style={{ textAlign: 'center' }}>Загрузка...</div>}
    </ul>
  )
}
