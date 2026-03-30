import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ProblemSectionGSAP from '@/components/home/ProblemSectionGSAP';
import ProgramsSection from '@/components/home/ProgramsSection';
import MetricsSection from '@/components/home/MetricsSection';
import PartnersSection from '@/components/home/PartnersSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSectionGSAP />
        <ProgramsSection />
        <MetricsSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
