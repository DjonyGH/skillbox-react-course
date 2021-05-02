import React from 'react';
import styles from './userblock.css';
import {Icon} from '../../../Icon'

interface IUserBlockProps {
  avatarSrc?: string
  userName?: string
}

export function UserBlock({avatarSrc, userName}: IUserBlockProps) {
  return (
    <a className={styles.userBlock}>
      <div className={styles.userAvatar}>
        {/* {avatarSrc
          ? <img src={avatarSrc} alt="userAvatar" className={styles.avatarImg}/> */}
           <Icon name='icon' size={50}/>  
        
      </div>
      <div className={userName ? styles.userName : styles.userNameAnon }> 
          {userName || 'Аноним'}
      </div>
    </a>
  );
}
