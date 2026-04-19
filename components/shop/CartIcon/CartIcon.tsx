'use client';
import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import styles from './CartIcon.module.scss';

interface CartIconProps {
  className?: string;
}

export default function CartIcon({ className }: CartIconProps) {
  const totalCount = useCartStore((s) => s.totalCount());

  return (
    <Link href="/cart" className={`${styles.wrap} ${className ?? ''}`} aria-label="장바구니">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 2h1.5l2.3 8.5h8.4l1.8-6H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="16.5" r="1.25" fill="currentColor" />
        <circle cx="13.5" cy="16.5" r="1.25" fill="currentColor" />
      </svg>
      {totalCount > 0 && <span className={styles.badge}>{totalCount > 99 ? '99+' : totalCount}</span>}
    </Link>
  );
}
