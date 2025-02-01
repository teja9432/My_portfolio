import React from 'react';
import styles from "./Meter.module.css";
const Meter = ({ per,width }) => {
  const percentage = per;
  return (
    <div className={styles.meter} style={{ border: '1px solid yellow', width:{width}, height: '15px', position: 'relative' }}>
      <div style={{
        height: '100%',
        width: percentage,
        backgroundColor: 'rgb(152, 152, 60)',
        transition: 'width 0.5s ease',
        borderRadius: '15px' // Corrected here
      }}>
      </div>
    </div>
  );
};

export default Meter;
