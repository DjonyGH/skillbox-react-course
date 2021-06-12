import React from 'react'
import styles from './card.css'
import { CardControls } from './CardControls'
import { CardImgPreview } from './CardImgPreview'
import { CardDropdownMenu } from './CardDropdownMenu'
import { CardTextContent } from './CardTextContent'
import { CardDropdownMenuMobile } from './CardDropdownMenuMobile'
import { IPostsContextData } from '../CardsList'

export function Card(props: IPostsContextData) {
  return (
    <li className={styles.card}>
      <CardTextContent title={props.title} author={props.author} created={props.created} id={props.id} />

      <CardImgPreview previewImg={props.previewImg} />

      <CardDropdownMenu />

      <CardDropdownMenuMobile />

      <CardControls score={props.score} comments={props.comments} />
    </li>
  )
}
