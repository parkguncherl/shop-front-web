'use client';
import React from 'react';
import ProductCard, { ProductCardProps } from '@/components/shop/ProductCard/ProductCard';
import styles from './ProductGrid.module.scss';

interface ProductGridProps {
  products: ProductCardProps[];
  columns?: 2 | 3 | 4;
  loading?: boolean;
}

function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonLine} style={{ width: '80%' }} />
      <div className={styles.skeletonLine} style={{ width: '50%' }} />
    </div>
  );
}

export default function ProductGrid({ products, columns = 2, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className={`${styles.grid} ${styles[`col${columns}`]}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className={styles.empty}>
        <p>상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${styles[`col${columns}`]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
