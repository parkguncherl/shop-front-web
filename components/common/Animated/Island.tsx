import React from 'react';
import styles from './Island.module.scss';

interface IslandProps {
  children: React.ReactNode;
  spread: boolean;
  stylesOnNorm?: React.CSSProperties;
  stylesOnSpread?: React.CSSProperties;
}

export default function Island({ children, spread, stylesOnNorm, stylesOnSpread }: IslandProps) {
  const defaultStylesOnNorm = {
    width: '100px',
  };
  const defaultStylesOnSpread = {
    width: '300px',
  };

  return (
    <div
      className={styles.island}
      style={
        spread
          ? {
              ...(stylesOnSpread != undefined ? stylesOnSpread : defaultStylesOnSpread),
              // backgroundColor: '#f5f5f5',
              // display: 'flex',
              // alignItems: 'center',
              // justifyContent: 'center',
            }
          : { ...(stylesOnNorm != undefined ? stylesOnNorm : defaultStylesOnNorm) }
      }
    >
      <div>{children}</div>
      {/*{spread ? <div className={styles.spread}>{children}</div> : <div className={styles.collapsed}>{children}</div>}*/}
    </div>
  );
}
