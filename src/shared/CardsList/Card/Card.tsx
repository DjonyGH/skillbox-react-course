import React from 'react'
import styles from './card.css'
import { CardControls } from './CardControls'
import { CardImgPreview } from './CardImgPreview'
import { CardDropdownMenu } from './CardDropdownMenu'
import { CardTextContent } from './CardTextContent'
import { CardDropdownMenuMobile } from './CardDropdownMenuMobile'
import { usePostsData } from "../../../hooks/usePostsData";

export function Card() {
  const [data] = usePostsData();
  console.log('test', data);
  
  return (
    <li className={styles.card}>
      <CardTextContent />

      <CardImgPreview />

      <CardDropdownMenu />

      <CardDropdownMenuMobile />

      <CardControls />
    </li>
  )
}
