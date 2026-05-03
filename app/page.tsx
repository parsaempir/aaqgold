import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import ProductsSection from '@/components/ProductsSection';
import InstallmentSection from '@/components/InstallmentSection';
import LiveGoldPrice from '@/components/LiveGoldPrice';
import WhyChooseUs from '@/components/WhyChooseUs';
import MarketInsight from '@/components/MarketInsight';
import ProfitCalculator from '@/components/ProfitCalculator';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <TrustSection />
        <ProductsSection />
        <InstallmentSection />
        <LiveGoldPrice />
        <WhyChooseUs />
        <MarketInsight />
        <ProfitCalculator />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
