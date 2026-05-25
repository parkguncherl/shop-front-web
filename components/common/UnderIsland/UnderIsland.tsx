import React from 'react';
import styles from './UnderIsland.module.scss';

interface IslandProps {
  children: React.ReactNode;
  content: React.ReactNode;
  spread: boolean;
}

export default function UnderIsland({ children, content, spread }: IslandProps) {
  return (
    <div className={`${styles.underIsland} ${spread ? styles.active : ''}`}>
      <div
        className={styles.island}
        // style={
        //   spread
        //     ? {
        //         height: '400px',
        //       }
        //     : undefined
        // }
      >
        {/* 닫힘 시점에 컨텐츠가 잔존하여 지저분한 모습을 보이는 일이 없도록 조건부 랜더링 처리 */}
        <div className={styles.islandContent}>{spread ? content : ''}</div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
