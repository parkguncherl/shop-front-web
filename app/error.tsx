'use client';
import { useEffect } from 'react';
import styles from './not-found.module.scss';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrap}>
      <p className={styles.code}>오류</p>
      <h1 className={styles.title}>잠시 문제가 발생했어요</h1>
      <p className={styles.desc}>일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
      <button onClick={reset} className={styles.btn}>
        다시 시도
      </button>
    </div>
  );
}
