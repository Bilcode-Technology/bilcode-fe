import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplashAnimation } from "./hooks/useSplashAnimation";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import OurTeam from "./components/OurTeam";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FullScreenTransition from "./components/FullScreenTransition";

gsap.registerPlugin(ScrollTrigger);

const SECTION_NAMES = {
  hero: "Home",
  services: "Services",
  portfolio: "Portfolio",
  team: "Our Team",
  testimonials: "Testimonials",
  contact: "Contact",
};

const TEXT = "bilcode.id";

function App() {
  const [showContent, setShowContent] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const transitionRef = useRef(null);
  const overlayRef = useRef(null);
  const whiteOverlayRef = useRef(null);
  const contentWrapperRef = useRef(null);

  const { textRefs } = useSplashAnimation(
    { transitionRef, contentWrapperRef },
    () => setShowContent(true),
    TEXT
  );

  // Dropdown overlay
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        autoAlpha: isDropdownVisible ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, [isDropdownVisible]);

  // Scroll animation untuk overlay text
  useEffect(() => {
    if (!showContent) return;

    const ctx = gsap.context(() => {
      const whiteOverlay = whiteOverlayRef.current;
      const overlayText = whiteOverlay?.querySelector(".overlay-text");
      if (!whiteOverlay || !overlayText) return;

      gsap.set([whiteOverlay, overlayText], { autoAlpha: 0 });

      const createScrollTransition = (section, nextSection) => {
        const nextName = SECTION_NAMES[nextSection.dataset.section];

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "bottom center",
            end: "bottom top",
            scrub: true,
          },
        })
          .set(overlayText, { textContent: nextName })
          // Fade in
          .to(whiteOverlay, { autoAlpha: 1, duration: 0.3 })
          .fromTo(
            overlayText,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
            "<"
          )
          // Fade out
          .to(
            overlayText,
            { autoAlpha: 0, duration: 0.4, ease: "power2.in" },
            "+=0.1"
          )
          .to(whiteOverlay, { autoAlpha: 0, duration: 0.3 }, "<");
      };

      const sections = gsap.utils.toArray(".scroll-section");
      sections.forEach((section, i) => {
        if (i === sections.length - 1) return;
        const next = sections[i + 1];
        createScrollTransition(section, next);
      });
    });

    return () => ctx.revert();
  }, [showContent]);

  return (
    <div className="App">
      {textRefs && (
        <FullScreenTransition
          ref={transitionRef}
          textRefs={textRefs}
          text={TEXT}
        />
      )}

      <div
        ref={whiteOverlayRef}
        className="fixed inset-0 bg-white pointer-events-none flex items-center justify-center z-40"
      >
        <div className="overlay-text text-4xl md:text-6xl font-bold text-gray-800 tracking-wider uppercase"></div>
      </div>

      <div ref={contentWrapperRef} style={{ opacity: 0 }}>
        <Header
          isDropdownVisible={isDropdownVisible}
          onDropdownToggle={setDropdownVisible}
        />

        <div ref={overlayRef} className="fixed inset-0 bg-black/30 z-30" />

        <main className="relative z-20">
          <section className="scroll-section" data-section="hero">
            <Hero />
          </section>
          <section className="scroll-section" data-section="services">
            <Services />
          </section>
          <section className="scroll-section" data-section="portfolio">
            <Portfolio />
          </section>
          <section className="scroll-section" data-section="team">
            <OurTeam />
          </section>
          <section className="scroll-section" data-section="testimonials">
            <Testimonials />
          </section>
          <section className="scroll-section" data-section="contact">
            <Contact />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;