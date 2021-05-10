import React from 'react'
import styles from './card.css'
import { CardControls } from './CardControls'
import { CardImgPreview } from './CardImgPreview'
import { CardDropdownMenu } from './CardDropdownMenu'
import { CardTextContent } from './CardTextContent'
import { CardDropdownMenuMobile } from './CardDropdownMenuMobile'
import { IPostsContextData } from '../../context/postsContext'

export function Card(props: IPostsContextData) {
  return (
    <li className={styles.card}>
      <CardTextContent title={props.title} />

      <CardImgPreview />

      <CardDropdownMenu />

      <CardDropdownMenuMobile />

      <CardControls />
    </li>
  )
}
