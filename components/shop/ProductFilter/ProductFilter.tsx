'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './ProductFilter.module.scss';

const SORT_OPTIONS = [
  { label: '상품정렬', value: '' },
  { label: '신상품순', value: 'new' },
  { label: '인기순', value: 'popular' },
  { label: '낮은가격순', value: 'price_asc' },
  { label: '높은가격순', value: 'price_desc' },
];

interface ProductFilterProps {
  totalCount: number;
}

export default function ProductFilter({ totalCount }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);

  const currentSort = searchParams.get('sort') ?? '';
  const currentLabel = SORT_OPTIONS.find((o) => o.value === currentSort)?.label ?? '상품정렬';

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('sort', value);
    else params.delete('sort');
    router.push(`?${params.toString()}`);
    setSortOpen(false);
  };

  return (
    <div className={styles.wrap}>
      <span className={styles.count}>
        전체 <strong>{totalCount.toLocaleString()}</strong>개
      </span>

      <div className={styles.sortWrap}>
        <button className={styles.sortBtn} onClick={() => setSortOpen((v) => !v)}>
          {currentLabel}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{ transform: sortOpen ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s' }}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {sortOpen && (
          <ul className={styles.dropdown}>
            {SORT_OPTIONS.map((opt) => (
              <li key={opt.value}>
                <button className={`${styles.dropdownItem} ${currentSort === opt.value ? styles.selected : ''}`} onClick={() => handleSort(opt.value)}>
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
