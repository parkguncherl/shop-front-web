'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WishlistBtn from '@/components/shop/WishlistBtn/WishlistBtn';
import Badge from '@/components/common/Badge/Badge';
import styles from './ProductCard.module.scss';

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  hoverImageUrl?: string;
  badge?: 'new' | 'sale' | 'best';
  soldOut?: boolean;
}

export default function ProductCard({ id, name, price, originalPrice, imageUrl, hoverImageUrl, badge, soldOut = false }: ProductCardProps) {
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null;

  return (
    <Link href={`/product/${id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image src={imageUrl} alt={name} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className={styles.image} />
        {hoverImageUrl && <Image src={hoverImageUrl} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" className={styles.hoverImage} />}

        {soldOut && <div className={styles.soldOutOverlay}>SOLD OUT</div>}

        <div className={styles.topLeft}>{badge && <Badge variant={badge}>{badge.toUpperCase()}</Badge>}</div>

        <WishlistBtn productId={id} className={styles.wishlistBtn} />
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <div className={styles.priceRow}>
          {discount !== null && discount > 0 && <span className={styles.discount}>{discount}%</span>}
          <span className={styles.price}>{price.toLocaleString()}원</span>
          {originalPrice && <span className={styles.originalPrice}>{originalPrice.toLocaleString()}원</span>}
        </div>
      </div>
    </Link>
  );
}
