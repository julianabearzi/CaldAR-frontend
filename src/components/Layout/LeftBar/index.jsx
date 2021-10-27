import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './leftbar.module.css';

const LeftBar = () => {
  return (
    <div className={styles.leftbarContainer}>
      <ul>
        <NavLink className={styles.leftbarItem} to="/home">
          Home
        </NavLink>
      </ul>
      <ul>
        <NavLink className={styles.leftbarItem} to="/buildings">
          Buildings
        </NavLink>
      </ul>
    </div>
  );
};

export default LeftBar;
