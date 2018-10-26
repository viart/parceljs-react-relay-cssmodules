import React from 'react';

import styles from './styles.css';

const KINDS = ['primary'];

export default function ({ children, kind, className, ...props }) {
  const classes = [
    styles.button,
    styles[`kind-${KINDS.includes(kind) ? kind : KINDS[0]}`],
    className
  ].join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
