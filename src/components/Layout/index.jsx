import React from 'react';
import Header from './Header';
import LeftBar from './LeftBar';
import Main from './Main';
import styles from './layout.module.css';

const Layout = ({ children }) => (
  <div className={styles.layoutContainer}>
    <LeftBar />
    <div className={styles.mainContainer}>
      <Header />
      <Main container={children} />
    </div>
  </div>
);

export default Layout;
