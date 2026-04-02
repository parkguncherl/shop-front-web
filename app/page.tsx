import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      {/* 상단 헤더 영역 */}
      <header className={styles.header}>
        <div className={styles.menuIcon}>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </div>
        <h1 className={styles.logo}>PIGMENT</h1>
        <div className={styles.icons}>
          <span className={styles.icon}>🔍</span>
          <span className={styles.icon}>👤</span>
          <span className={styles.icon}>👜<small>0</small></span>
        </div>
      </header>

      {/* 메인 랜딩 배너 (n장 스와이핑 영역) */}
      <section className={styles.mainBanner}>
        <div className={styles.bannerImageWrapper}>
          {/* 실제 이미지 경로로 수정 필요 */}
          <div className={styles.placeholderImg}>
            <div className={styles.bannerText}>
              <h2>Twopocket<br />Denim Pants</h2>
              <p>PIGMENT MAKES THE NEW SEASON.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 네비게이션 */}
      <nav className={styles.categoryNav}>
        <ul>
          <li className={styles.active}>봄 신상 ~50%</li>
          <li>투데이특가</li>
          <li>1+1</li>
          <li>신상품</li>
          <li>베스트셀러</li>
        </ul>
      </nav>

      {/* 상품 리스트 섹션 (NEW) */}
      <section className={styles.productSection}>
        <div className={styles.sectionHeader}>
          <h3>NEW</h3>
          <span className={styles.viewAll}>view all 1/2</span>
        </div>

        <div className={styles.productGrid}>
          {/* 상품 아이템 1 */}
          <div className={styles.productCard}>
            <div className={styles.imageBox}>
              {/* <Image src="/path/to/img.jpg" alt="상품" fill /> */}
              <div className={styles.placeholder}>이미지</div>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>[CAREFREE] 코튼와이드SL</p>
              <p className={styles.price}>
                <span className={styles.original}>71,800WON</span>
                <span className={styles.current}>35,900WON</span>
                <span className={styles.discount}>50%</span>
              </p>
            </div>
          </div>

          {/* 상품 아이템 2 */}
          <div className={styles.productCard}>
            <div className={styles.imageBox}>
              <div className={styles.placeholder}>이미지</div>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>투버튼데님팬츠BL</p>
              <p className={styles.price}>
                <span className={styles.original}>65,800WON</span>
                <span className={styles.current}>32,900WON</span>
                <span className={styles.discount}>50%</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}