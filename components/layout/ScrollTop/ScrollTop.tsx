'use client';
import React, { useState, useEffect } from 'react';
import styles from './ScrollTop.module.scss';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className={`${styles.btn} ${visible ? styles.visible : ''}`} onClick={handleClick} aria-label="맨 위로 이동">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 12l6-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
