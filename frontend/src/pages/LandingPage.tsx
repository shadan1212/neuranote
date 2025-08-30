import Features from "../components/Features";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import DashboardSS from "../components/DashboardSS";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 pt-3">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main>
        <Hero />
        <Features />
        <DashboardSS />
        <HowItWorks />
        <CTA />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
