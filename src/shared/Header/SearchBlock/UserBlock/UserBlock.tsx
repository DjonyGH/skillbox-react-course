import React from "react";
import styles from "./userblock.css";
import { Icon } from "../../../Icon";

interface IUserBlockProps {
  avatarSrc?: string;
  userName?: string;
}

export function UserBlock({ avatarSrc, userName }: IUserBlockProps) {
  return (
    <a
      href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read submit identity`}
      className={styles.userBlock}
    >
      <div className={styles.userAvatar}>
        {/* {avatarSrc
          ? <img src={avatarSrc} alt="userAvatar" className={styles.avatarImg}/> */}
        <Icon name="icon" size={50} />
      </div>
      <div
        className={[styles.userName, !userName ? styles.userNameAnon : ""].join(
          " "
        )}
      >
        {userName || "Аноним"}
      </div>
    </a>
  );
}
