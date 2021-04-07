import React from 'react';
import styles from './cardTextContent.css';

export function CardTextContent() {
  return (
    <div className={styles.textContent}>
      <div className={styles.metaData}>
        <div className={styles.userLink}>            
          <img
            className={styles.avatar}
            src="https://cdn.dribbble.com/users/6487119/avatars/normal/ea69d98ea3643959838e2ef4e421e107.png?1606648385&compress=1&resize=60x60"
            alt="avatar"
          />
          <a href="#user-url" className={styles.userName}>Дмитрий Гришин</a>
        </div>
        <span className={styles.publishedLabel}>опубликовано</span>
        <span className={styles.createdAt}>4 часа назад</span>
      </div>
      <h2 className={styles.title}>
        <a href="#post-url" className={styles.postLink}>
          Стоит отметить, что новая модель организационной деятельности. Стоит отметить, что новая модель организационной деятельности.
        </a>
      </h2>
      <div className={styles.viewedAd}>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0C4.36364 0 1.25818 2.28067 0 5.5C1.25818 8.71933 4.36364 11 8 11C11.6364 11 14.7418 8.71933 16 5.5C14.7418 2.28067 11.6364 0 8 0ZM8 9.16667C5.99273 9.16667 4.36364 7.524 4.36364 5.5C4.36364 3.476 5.99273 1.83333 8 1.83333C10.0073 1.83333 11.6364 3.476 11.6364 5.5C11.6364 7.524 10.0073 9.16667 8 9.16667ZM8 3.3C6.79273 3.3 5.81818 4.28267 5.81818 5.5C5.81818 6.71733 6.79273 7.7 8 7.7C9.20727 7.7 10.1818 6.71733 10.1818 5.5C10.1818 4.28267 9.20727 3.3 8 3.3Z" fill="#999999"/>
        </svg>
        1 час назад
      </div>
    </div>
  );
}
