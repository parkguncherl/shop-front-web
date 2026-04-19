import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <span className={styles.brand}>GGUANGGU</span>
          <nav className={styles.links}>
            <Link href="/info/about">브랜드 소개</Link>
            <Link href="/info/privacy">개인정보처리방침</Link>
            <Link href="/info/terms">이용약관</Link>
            <Link href="/info/shipping">배송·반품 안내</Link>
          </nav>
        </div>
        <p className={styles.copy}>© 2025 GGUANGGU. All rights reserved.</p>
      </div>
    </footer>
  );
}
