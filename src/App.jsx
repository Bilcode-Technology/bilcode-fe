import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import AboutUs from "./components/AboutUs";
import Process from "./components/Process";
import OurTeam from "./components/OurTeam";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import TechStack from "./sections/TechStack";
import SplashScreen from "./components/SplashScreen";
import ScrollRevealSection from "./components/ScrollRevealSection";

function App() {
  return (
    <div className="App">
      <SplashScreen />
      <Header />
      <ScrollRevealSection><Hero /></ScrollRevealSection>
      <Services />
      <ScrollRevealSection><Portfolio /></ScrollRevealSection>
      <ScrollRevealSection><AboutUs /></ScrollRevealSection>
      <ScrollRevealSection><TechStack /></ScrollRevealSection>
      <ScrollRevealSection><Process /></ScrollRevealSection>
      <ScrollRevealSection><OurTeam /></ScrollRevealSection>
      <ScrollRevealSection><Testimonials /></ScrollRevealSection>
      <ScrollRevealSection><CTA /></ScrollRevealSection>
      <ScrollRevealSection><Contact /></ScrollRevealSection>
      <Footer />
    </div>
  );
}

export default App;
