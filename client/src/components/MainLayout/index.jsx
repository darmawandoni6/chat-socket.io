import React from 'react';

import styles from './styles.module.scss';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.main}>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
