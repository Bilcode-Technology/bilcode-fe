import { useState, useRef, useEffect } from "react";
import { useSplashAnimation, useFullScreenSectionTransition } from "./hooks";
import { gsap } from "gsap";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import OurTeam from "./components/OurTeam";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FullScreenTransition from "./components/FullScreenTransition";

function App() {
  const [showContent, setShowContent] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const transitionRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);

  useSplashAnimation({ transitionRef, textRef }, () => setShowContent(true));
  useFullScreenSectionTransition(transitionRef, textRef);

  useEffect(() => {
    if (isDropdownVisible) {
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 });
    } else {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 });
    }
  }, [isDropdownVisible]);

  return (
    <div className="App">
      <FullScreenTransition ref={{ transitionRef, textRef }} />

      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Header
          isDropdownVisible={isDropdownVisible}
          onDropdownToggle={setDropdownVisible}
        />
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/30 z-30"
          style={{ visibility: "hidden", opacity: 0 }}
        />
        <main className="relative z-20">
          <div id="hero" data-section-name="Hero" className="tracked-section">
            <Hero />
          </div>
          <div
            id="services"
            data-section-name="Services"
            className="tracked-section"
          >
            <Services />
          </div>
          <div
            id="portfolio"
            data-section-name="Portfolio"
            className="tracked-section"
          >
            <Portfolio />
          </div>
          <div id="team" data-section-name="Team" className="tracked-section">
            <OurTeam />
          </div>
          <div
            id="testimonials"
            data-section-name="Testimonials"
            className="tracked-section"
          >
            <Testimonials />
          </div>
          {/* <div id="cta" data-section-name="CTA" className="tracked-section">
            <CTA />
          </div> */}
          <div
            id="contact"
            data-section-name="Contact"
            className="tracked-section"
          >
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
