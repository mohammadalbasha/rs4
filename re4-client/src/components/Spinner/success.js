import React from 'react';
import styles from './spinner.module.css';

const Success = ({ success }) => {
  return <div className={styles.success}>{success}</div>;
};

export default Success;
