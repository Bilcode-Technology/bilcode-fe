import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

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
import FullScreenTransition from "./components/FullScreenTransition";

function App() {
  const [showContent, setShowContent] = useState(false);
  const transitionRef = useRef(null);
  const textRef = useRef(null);

  // useEffect(() => {
  //   // Set the text content for the transition
  //   if (textRef.current) {
  //     textRef.current.textContent = '"Your Vision, Our Code"';
  //   }

  //   const tl = gsap.timeline({
  //     onComplete: () => {
  //       setShowContent(true);
  //     },
  //   });

  //   // Animation sequence
  //   tl.to(transitionRef.current, { y: "0%", duration: 1, ease: "power3.inOut" })
  //     .to(textRef.current, { opacity: 1, duration: 0.5 }, "-=0.5")
  //     .to(textRef.current, { opacity: 0, duration: 0.5, delay: 1.5 }) // Hold text
  //     .to(transitionRef.current, {
  //       y: "-100%",
  //       duration: 1,
  //       ease: "power3.inOut",
  //     });
  // }, []);

  return (
    <div className="App">
      <FullScreenTransition ref={{ transitionRef, textRef }} />

      {/* Use opacity for a smooth fade-in of the main content */}
      <div
      // style={{
      //   opacity: showContent ? 1 : 0,
      //   transition: "opacity 0.5s ease-in-out",
      // }}
      >
        <Header />
        <main>
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
          <div id="about" data-section-name="About" className="tracked-section">
            <AboutUs />
          </div>
          <div
            id="techstack"
            data-section-name="Tech"
            className="tracked-section"
          >
            <TechStack />
          </div>
          <div
            id="process"
            data-section-name="Process"
            className="tracked-section"
          >
            <Process />
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
          <div id="cta" data-section-name="CTA" className="tracked-section">
            <CTA />
          </div>
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
