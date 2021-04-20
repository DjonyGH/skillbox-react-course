import React from "react";
import styles from "./card.css";
import { CardControls } from "./CardControls";
import { CardImgPreview } from "./CardImgPreview";
import { CardDropdownMenu } from "./CardDropdownMenu";
import { CardTextContent } from "./CardTextContent";
import { CardDropdownMenuMobile } from "./CardDropdownMenuMobile";

export function Card() {
  return (
    <li className={styles.card}>
      <CardTextContent />

      <CardImgPreview />

      <CardDropdownMenu />

      <CardDropdownMenuMobile />

      <CardControls />
    </li>
  );
}
