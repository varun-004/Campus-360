import useDocumentTitle from "../../hooks/useDocumentTitle";
import LandingNavbar from "./components/LandingNavbar";
import HeroSection from "./components/HeroSection";
import ProductPreviewSection from "./components/ProductPreviewSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import RoleBenefitsSection from "./components/RoleBenefitsSection";
import AiIntelligenceSection from "./components/AiIntelligenceSection";
import FaqSection from "./components/FaqSection";
import CtaSection from "./components/CtaSection";
import LandingFooter from "./components/LandingFooter";

const LandingPage = () => {
  useDocumentTitle("Campus 360 — Modern Academic Operations & Student Intelligence");

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 selection:bg-brand-600 selection:text-white">
      {/* Accessible Navbar with Live Auth Status */}
      <LandingNavbar />

      {/* Main Semantic Content Area */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero & Real Dashboard Preview */}
        <HeroSection />

        {/* 2. Interactive Product Preview */}
        <ProductPreviewSection />

        {/* 3. Comprehensive Feature Grid */}
        <FeaturesSection />

        {/* 4. 4-Step Academic Workflow */}
        <HowItWorksSection />

        {/* 5. Role-Based Benefits (Students, Faculty, Admins) */}
        <RoleBenefitsSection />

        {/* 6. Machine Learning Academic Intelligence (Grounded in Real ML Model) */}
        <AiIntelligenceSection />

        {/* 7. Frequently Asked Questions (Accessible Accordion) */}
        <FaqSection />

        {/* 8. Conversion Call to Action */}
        <CtaSection />
      </main>

      {/* 9. Comprehensive Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
