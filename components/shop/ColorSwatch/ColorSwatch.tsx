'use client';
import React from 'react';
import styles from './ColorSwatch.module.scss';

interface Color {
  value: string;
  label: string;
  hex: string;
  soldOut?: boolean;
}

interface ColorSwatchProps {
  colors: Color[];
  selected: string;
  onChange: (color: string) => void;
}

export default function ColorSwatch({ colors, selected, onChange }: ColorSwatchProps) {
  return (
    <div className={styles.wrap}>
      <p className={styles.label}>
        색상
        {selected && <span className={styles.selectedLabel}>&nbsp;— {colors.find((c) => c.value === selected)?.label}</span>}
      </p>
      <div className={styles.swatches}>
        {colors.map((color) => (
          <button
            key={color.value}
            className={`${styles.swatch}
              ${selected === color.value ? styles.selected : ''}
              ${color.soldOut ? styles.soldOut : ''}`}
            style={{ background: color.hex }}
            onClick={() => !color.soldOut && onChange(color.value)}
            title={color.label}
            aria-label={`${color.label}${color.soldOut ? ' (품절)' : ''}`}
            aria-pressed={selected === color.value}
          />
        ))}
      </div>
    </div>
  );
}
