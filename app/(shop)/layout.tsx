import Header from '@/components/common/Header/Header';
import Navigation from '@/components/common/Navigation/Navigation';
import Footer from '@/components/common/Footer/Footer';
import MobileNav from '@/components/layout/MobileNav/MobileNav';
import ScrollTop from '@/components/layout/ScrollTop/ScrollTop';
import styles from './layout.module.scss';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />
      <Navigation />
      <main className={styles.main}>{children}</main>
      <Footer />
      <MobileNav />
      <ScrollTop />
    </div>
  );
}
