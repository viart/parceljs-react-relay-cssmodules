import React from 'react';

import logo from './logo.svg';
import styles from './styles.css';

export default function () {
  return (
    <div className={styles.container}>
      <img src={logo} className={styles.spinner} />
    </div>
  );
}
