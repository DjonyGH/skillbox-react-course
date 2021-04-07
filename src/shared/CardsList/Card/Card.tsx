import React from 'react';
import styles from './card.css';

import { CardTextContent } from './CardTextContent'
import { CardImgPreview } from './CardImgPreview'
import { CardMenu } from './CardMenu'
import { CardControls } from './CardControls'

export function Card() {
  return (
    <li className={styles.card}>
      <CardTextContent />
      
      <CardImgPreview />

      <CardMenu />

      <CardControls />
    </li>
  );
}
