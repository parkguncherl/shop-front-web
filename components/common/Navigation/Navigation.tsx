'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './Navigation.module.scss';

const CATEGORIES = [
  { label: '전체', href: '/products' },
  { label: 'SEASON', href: '/products?category=best' },
  { label: '티셔츠', href: '/products?category=tshirts' },
  { label: '팬츠', href: '/products?category=pants' },
  { label: '셔츠&블라우스', href: '/products?category=shirts' },
  { label: '드레스&스커트', href: '/products?category=dress' },
  { label: '니트웨어', href: '/products?category=knit' },
  { label: '아우터', href: '/products?category=outer' },
  { label: '액세서리', href: '/products?category=acc' },
];

export default function Navigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentCategory = searchParams.get('category');

  const isActive = (href: string) => {
    if (href === '/products' && !currentCategory) return true;
    const categoryMatch = href.match(/category=(\w+)/);
    if (categoryMatch) return currentCategory === categoryMatch[1];
    return false;
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.scrollArea} ref={scrollRef}>
        {CATEGORIES.map((cat) => (
          <Link key={cat.href} href={cat.href} className={`${styles.item} ${isActive(cat.href) ? styles.active : ''}`}>
            {cat.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
