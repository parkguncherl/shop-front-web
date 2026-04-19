'use client';
import React, { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './CategoryTabs.module.scss';

const TABS = [
  { label: '전체', value: '' },
  { label: '베스트셀러', value: 'best' },
  { label: '투데이특가', value: 'today' },
  { label: '오프라인베스트', value: 'offline' },
  { label: '티셔츠', value: 'tshirts' },
  { label: '팬츠', value: 'pants' },
  { label: '셔츠&블라우스', value: 'shirts' },
  { label: '드레스&스커트', value: 'dress' },
  { label: '니트웨어', value: 'knit' },
  { label: '아우터', value: 'outer' },
  { label: '액세서리', value: 'acc' },
];

interface CategoryTabsProps {
  countMap?: Record<string, number>;
}

export default function CategoryTabs({ countMap }: CategoryTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const current = searchParams.get('category') ?? '';

  const handleTab = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('category', value);
    else params.delete('category');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.scrollArea} ref={scrollRef}>
        {TABS.map((tab) => (
          <button key={tab.value} className={`${styles.tab} ${current === tab.value ? styles.active : ''}`} onClick={() => handleTab(tab.value)}>
            {tab.label}
            {countMap?.[tab.value] !== undefined && <span className={styles.count}>({countMap[tab.value]})</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
