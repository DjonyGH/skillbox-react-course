import React from 'react';
import styles from './card.css';
import { CardControls } from './CardControls';
import { CardImgPreview } from './CardImgPreview';
import { CardMenu } from './CardMenu';
import { CardTextContent } from './CardTextContent';

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
