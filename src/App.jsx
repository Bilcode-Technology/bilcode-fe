import { useRef, useState, useLayoutEffect, useCallback } from "react";
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
  const [isSplashing, setIsSplashing] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Refs
  const transitionRef = useRef(null);
  const overlayRef = useRef(null); // dropdown overlay
  const whiteOverlayRef = useRef(null); // scroll overlay
  const contentWrapperRef = useRef(null);

  const onSplashComplete = useCallback(() => {
    setIsSplashing(false);
  }, []);

  // Splash screen
  const { textRefs } = useSplashAnimation(
    { transitionRef, contentWrapperRef },
    onSplashComplete,
    TEXT
  );

  /**
   * Dropdown overlay animation
   */
  useLayoutEffect(() => {
    if (!overlayRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        autoAlpha: isDropdownVisible ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, [isDropdownVisible]);

  /**
   * Scroll overlay animation (section transition text)
   */
  useLayoutEffect(() => {
    if (isSplashing) return;
    if (!whiteOverlayRef.current) return;

    const ctx = gsap.context(() => {
      const whiteOverlay = whiteOverlayRef.current;
      const overlayText = whiteOverlay.querySelector(".overlay-text");

      gsap.set(whiteOverlay, { autoAlpha: 0 });
      let activeTween = null;

      const sections = gsap.utils.toArray(".scroll-section");

      sections.forEach((section) => {
        const sectionName = SECTION_NAMES[section.dataset.section];
        if (!sectionName) {
          return; // No transition for sections without a name
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          onToggle: (self) => {
            if (self.isActive) {
              // Entered the zone, from top or bottom
              if (activeTween) {
                activeTween.kill();
              }
              overlayText.textContent = sectionName;
              activeTween = gsap.to(whiteOverlay, {
                autoAlpha: 1,
                duration: 0.3,
              });
            } else {
              // Left the zone, from top or bottom
              if (activeTween) {
                activeTween.kill();
              }
              activeTween = gsap.to(whiteOverlay, {
                autoAlpha: 0,
                duration: 0.3,
              });
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, [isSplashing]);

  return (
    <div className="App">
      {/* Splash Transition */}
      {isSplashing && textRefs && (
        <FullScreenTransition
          ref={transitionRef}
          textRefs={textRefs}
          text={TEXT}
        />
      )}

      {/* Scroll Overlay */}
      <div
        ref={whiteOverlayRef}
        className="fixed inset-0 bg-white pointer-events-none flex items-center justify-center z-40"
      >
        <div className="overlay-text text-4xl md:text-6xl font-bold text-gray-800 tracking-wider uppercase"></div>
      </div>

      {/* Content */}
      <div ref={contentWrapperRef} style={{ opacity: 0 }}>
        <Header
          isDropdownVisible={isDropdownVisible}
          onDropdownToggle={setDropdownVisible}
        />

        {/* Dropdown Overlay */}
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
