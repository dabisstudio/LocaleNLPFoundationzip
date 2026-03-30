import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ProblemSection from '@/components/home/ProblemSection';
import ProgramsSection from '@/components/home/ProgramsSection';
import ImpactMapSection from '@/components/home/ImpactMapSection';
import MetricsSection from '@/components/home/MetricsSection';
import PartnersSection from '@/components/home/PartnersSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSection />
        <ProgramsSection />
        <ImpactMapSection />
        <MetricsSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
