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
  services: "Services",
  portfolio: "Portfolio",
  team: "Our Team",
  testimonials: "Testimonials",
};

const TEXT = "bilcode.id";

// fungsi debounce manual (untuk ganti gsap.utils.debounce)
const debounce = (fn, delay = 200) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

function App() {
  const [isSplashing, setIsSplashing] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Refs
  const transitionRef = useRef(null);
  const overlayRef = useRef(null); // dropdown overlay
  const whiteOverlayRef = useRef(null); // scroll overlay
  const contentWrapperRef = useRef(null);

  const onSplashComplete = useCallback(() => {
    setIsSplashing(false);
    // Animasi untuk menampilkan konten setelah splash selesai
    setTimeout(() => {
      if (contentWrapperRef.current) {
        gsap.to(contentWrapperRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            // Delay tambahan untuk memastikan layout stabil
            setTimeout(() => {
              setIsContentVisible(true);
              // Multiple refresh untuk memastikan posisi yang akurat
              setTimeout(() => {
                ScrollTrigger.refresh();
              }, 100);
            }, 100);
          }
        });
      }
    }, 100);
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
    if (!overlayRef.current || !isContentVisible) return;
    
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        autoAlpha: isDropdownVisible ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, [isDropdownVisible, isContentVisible]);

  /**
   * Scroll overlay animation (section transition text)
   */
  useLayoutEffect(() => {
    if (!isContentVisible || !whiteOverlayRef.current) return;

    // Delay untuk memastikan DOM sudah stabil
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        const whiteOverlay = whiteOverlayRef.current;
        const overlayText = whiteOverlay.querySelector(".overlay-text");

        gsap.set(whiteOverlay, { autoAlpha: 0 });
        let activeTween = null;

        // Pastikan semua section sudah di-render
        const sections = gsap.utils.toArray(".scroll-section");
        
        if (sections.length === 0) {
          console.warn("No sections found, retrying...");
          return;
        }

        sections.forEach((section, index) => {
          const sectionName = SECTION_NAMES[section.dataset.section];
          if (!sectionName) {
            return; // No transition for hero & contact
          }

          ScrollTrigger.create({
            trigger: section,
            start: "top 75%", // Lebih toleran untuk trigger awal
            end: "bottom 25%",
            refreshPriority: -1, // Lower priority untuk refresh
            onToggle: (self) => {
              console.log(`Section ${sectionName}: ${self.isActive ? 'active' : 'inactive'}`);
              
              if (self.isActive) {
                if (activeTween) activeTween.kill();
                overlayText.textContent = sectionName;
                activeTween = gsap.to(whiteOverlay, {
                  autoAlpha: 1,
                  duration: 0.3,
                });
              } else {
                if (activeTween) activeTween.kill();
                activeTween = gsap.to(whiteOverlay, {
                  autoAlpha: 0,
                  duration: 0.3,
                });
              }
            },
            onRefresh: () => {
              console.log(`ScrollTrigger refreshed for ${sectionName}`);
            }
          });
        });

        // Force refresh setelah semua trigger dibuat
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 50);
      });

      return () => ctx.revert();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isContentVisible]);

  /**
   * Additional ScrollTrigger refresh on window resize and after content is visible
   */
  useLayoutEffect(() => {
    if (!isContentVisible) return;

    const handleResize = debounce(() => ScrollTrigger.refresh(), 200);

    // Initial refresh setelah beberapa saat
    const timeouts = [
      setTimeout(() => ScrollTrigger.refresh(), 300),
      setTimeout(() => ScrollTrigger.refresh(), 600),
      setTimeout(() => ScrollTrigger.refresh(), 1000)
    ];

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isContentVisible]);

  /**
   * Cleanup ScrollTriggers on unmount
   */
  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
        style={{ visibility: isContentVisible ? 'visible' : 'hidden' }}
      >
        <div className="overlay-text text-4xl md:text-6xl font-bold text-gray-800 tracking-wider uppercase"></div>
      </div>

      {/* Content */}
      <div 
        ref={contentWrapperRef} 
        style={{ opacity: 0 }}
        className="min-h-screen"
      >
        <Header
          isDropdownVisible={isDropdownVisible}
          onDropdownToggle={setDropdownVisible}
        />

        {/* Dropdown Overlay */}
        <div 
          ref={overlayRef} 
          className="fixed inset-0 bg-black/30 z-30"
          style={{ visibility: isContentVisible ? 'visible' : 'hidden' }}
        />

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