import React from 'react'
import styles from './cardImgPreview.css'

export function CardImgPreview({ previewImg }: { previewImg?: string }) {
  return (
    <div className={styles.preview}>
      <img
        className={styles.previewImg}
        src={
          !!previewImg
            ? previewImg
            : 'https://cdn.dribbble.com/users/6487119/screenshots/15414864/media/e1655c35889b583676b9e00dbe6d4db1.png?compress=1&resize=1000x750'
        }
        alt=''
      />
    </div>
  )
}
