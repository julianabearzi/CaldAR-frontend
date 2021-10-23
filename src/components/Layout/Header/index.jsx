import React from 'react';
import styles from './header.module.css';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <span> - </span>
        <h1 className={styles.title}>CaldAR</h1>
        <span> - </span>
      </div>
    </div>
  );
};

export default Header;
