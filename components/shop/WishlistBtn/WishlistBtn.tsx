'use client';
import React from 'react';
import { useWishlistStore } from '@/stores/wishlistStore';
import styles from './WishlistBtn.module.scss';

interface WishlistBtnProps {
  productId: number;
  className?: string;
}

export default function WishlistBtn({ productId, className }: WishlistBtnProps) {
  const { isWishlisted, toggle } = useWishlistStore();
  const active = isWishlisted(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(productId);
  };

  return (
    <button className={`${styles.btn} ${active ? styles.active : ''} ${className ?? ''}`} onClick={handleClick} aria-label={active ? '찜 해제' : '찜하기'}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 16.5S2.5 12 2.5 7a4 4 0 017.5-2A4 4 0 0117.5 7c0 5-7.5 9.5-7.5 9.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? 'currentColor' : 'none'}
        />
      </svg>
    </button>
  );
}
