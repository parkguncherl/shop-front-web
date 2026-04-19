'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
  images: { url: string; alt?: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  return (
    <div className={styles.wrap}>
      {/* 메인 이미지 */}
      <div className={styles.main}>
        <Image
          src={images[active].url}
          alt={images[active].alt ?? '상품 이미지'}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.mainImg}
        />

        {/* 좌우 화살표 */}
        {images.length > 1 && (
          <>
            <button
              className={`${styles.arrow} ${styles.prev}`}
              onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
              aria-label="이전 이미지"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className={`${styles.arrow} ${styles.next}`} onClick={() => setActive((i) => (i + 1) % images.length)} aria-label="다음 이미지">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        {/* 도트 인디케이터 (모바일) */}
        {images.length > 1 && (
          <div className={styles.dots}>
            {images.map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === active ? styles.dotActive : ''}`} onClick={() => setActive(i)} aria-label={`이미지 ${i + 1}`} />
            ))}
          </div>
        )}
      </div>

      {/* 썸네일 (데스크톱) */}
      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((img, i) => (
            <button
              key={i}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`이미지 ${i + 1} 선택`}
            >
              <Image src={img.url} alt={img.alt ?? `썸네일 ${i + 1}`} fill sizes="80px" className={styles.thumbImg} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
