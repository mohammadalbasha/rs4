import React from 'react';
import styles from './spinner.module.css';

const Spinner = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <img
        className={styles.spinner__image}
        src="https://hstp-events.com/templates/jl_balder_pro/custom/images/logo.png"
      />
    </div>
  );
};

export default Spinner;
