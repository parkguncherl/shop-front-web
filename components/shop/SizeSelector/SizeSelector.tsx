'use client';
import React from 'react';
import styles from './SizeSelector.module.scss';

interface SizeSelectorProps {
  sizes: { value: string; label: string; soldOut?: boolean }[];
  selected: string;
  onChange: (size: string) => void;
}

export default function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  return (
    <div className={styles.wrap}>
      <p className={styles.label}>사이즈</p>
      <div className={styles.grid}>
        {sizes.map((size) => (
          <button
            key={size.value}
            className={`${styles.btn}
              ${selected === size.value ? styles.selected : ''}
              ${size.soldOut ? styles.soldOut : ''}`}
            onClick={() => !size.soldOut && onChange(size.value)}
            disabled={size.soldOut}
            aria-pressed={selected === size.value}
          >
            {size.label}
            {size.soldOut && <span className={styles.soldLine} />}
          </button>
        ))}
      </div>
    </div>
  );
}
