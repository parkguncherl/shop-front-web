import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>페이지를 찾을 수 없어요</h1>
      <p className={styles.desc}>요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있어요.</p>
      <Link href="/" className={styles.btn}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
