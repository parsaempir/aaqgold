import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductsShowcase from '@/components/ProductsShowcase';
import VisualStory from '@/components/VisualStory';
import GoldCalculator from '@/components/GoldCalculator';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="top" className="relative">
        <Hero />
        <GoldCalculator />
        <ProductsShowcase />
        <VisualStory />
      </main>
      <Footer />
    </>
  );
}
