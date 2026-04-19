import styles from './page.module.scss';

const DUMMY_PRODUCTS = [
  { id: 1, name: '레이스 스트라이프 가디건', price: 52000, originalPrice: 68000, badge: 'best' },
  { id: 2, name: '빈티지 니트 가디건', price: 48000, originalPrice: null, badge: 'new' },
  { id: 3, name: '크로셰 스트라이프 탑', price: 39000, originalPrice: 52000, badge: 'sale' },
  { id: 4, name: '레트로 컬러 가디건', price: 61000, originalPrice: null, badge: null },
  { id: 5, name: '라운드 넥 니트 가디건', price: 44000, originalPrice: 58000, badge: 'best' },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* 카테고리 탭 */}
      <div className={styles.filterRow}>
        <span className={styles.pageTitle}>베스트셀러</span>
        <button className={styles.sortBtn}>상품정렬 ▽</button>
      </div>
      {/* 상품 리스트 */}
      <div className={styles.productList}>
        {DUMMY_PRODUCTS.map((product) => (
          <div key={product.id} className={styles.productItem}>
            {/* 이미지 */}
            <div className={styles.imageWrap}>
              <img src={`https://picsum.photos/seed/${product.id}/400/533`} alt={product.name} className={styles.image} />
              {product.badge && <span className={`${styles.badge} ${styles[product.badge]}`}>{product.badge.toUpperCase()}</span>}
              <button className={styles.wishBtn} aria-label="찜하기">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M11 18.5S3 13.5 3 8a5 5 0 019.5-2.2A5 5 0 0119 8c0 5.5-8 10.5-8 10.5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* 상품 정보 */}
            <div className={styles.info}>
              <p className={styles.name}>{product.name}</p>
              <div className={styles.priceRow}>
                {product.originalPrice && <span className={styles.discount}>{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>}
                <span className={styles.price}>{product.price.toLocaleString()}원</span>
                {product.originalPrice && <span className={styles.originalPrice}>{product.originalPrice.toLocaleString()}원</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
