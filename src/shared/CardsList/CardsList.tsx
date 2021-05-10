import React, { useContext } from 'react'
import styles from './cardslist.css'
import { Card } from './Card'
import { PostsContextProvider } from '../context/postsContext'
import { postsContext, IPostsContextData } from '../context/postsContext'

export function CardsList() {
  const posts = useContext<IPostsContextData[]>(postsContext)
  console.log('>>', posts)

  return (
    <ul className={styles.cardList}>
      {posts.map((post) => (
        <Card
          key={post.id}
          author={post.author}
          previewImg={post.previewImg}
          title={post.title}
          created={post.created}
          score={post.score}
          comments={post.comments}
        />
      ))}
    </ul>
  )
}
