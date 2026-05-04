import Navbar from '@/components/Navbar';
import TrustStrip from '@/components/TrustStrip';
import ProductsShowcase from '@/components/ProductsShowcase';
import StickyActionBar from '@/components/StickyActionBar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="top" className="pt-16 md:pt-20">
        <TrustStrip />
        <ProductsShowcase />
      </main>
      <Footer />
      <StickyActionBar />
    </>
  );
}
