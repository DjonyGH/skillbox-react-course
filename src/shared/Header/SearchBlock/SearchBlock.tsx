import React from "react";
import { useUserData } from "../../../hooks/useUserData";
import styles from "./searchblock.css";
import { UserBlock } from "./UserBlock";

export function SearchBlock() {
  const [data] = useUserData();
  return (
    <div className={styles.searchBlock}>
      <UserBlock avatarSrc={data.iconImg} userName={data.name} />
    </div>
  );
}
