import { useRef, useState, useEffect, useCallback } from "react";
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

// Constants moved outside component to prevent recreation
const SECTION_NAMES = {
  'hero': 'Home',
  'services': 'Services',
  'portfolio': 'Portfolio', 
  'team': 'Our Team',
  'testimonials': 'Testimonials',
  'contact': 'Contact'
};

const TEXT = "bilcode.id";

// Animation configuration constants
const ANIMATION_CONFIG = {
  whiteOverlay: {
    show: { autoAlpha: 1, duration: 0.15, ease: "power2.out" },
    hide: { autoAlpha: 0, duration: 0.2, ease: "power2.inOut" }
  },
  text: {
    show: { autoAlpha: 1, y: 0, scale: 1, duration: 0.2, ease: "back.out(1.7)" },
    hide: { autoAlpha: 0, y: -20, scale: 0.95, duration: 0.15, ease: "power2.in" }
  },
  dropdown: {
    duration: 0.3
  }
};

function App() {
  const [showContent, setShowContent] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  
  // Refs
  const transitionRef = useRef(null);
  const overlayRef = useRef(null);
  const whiteOverlayRef = useRef(null);
  const contentWrapperRef = useRef(null);
  
  // Memoized values
  const scrollTriggersRef = useRef([]);
  
  const { textRefs } = useSplashAnimation(
    { transitionRef, contentWrapperRef },
    useCallback(() => setShowContent(true), []),
    TEXT
  );

  // Memoized animation functions
  const createSectionTransition = useCallback((overlayText, displayName, isLeaveBack = false) => {
    overlayText.textContent = displayName;
    
    const tl = gsap.timeline();
    const config = isLeaveBack ? 
      {
        showDuration: 0.1,
        textOffset: "-=0.05",
        textDelay: "+=0.08",
        hideOffset: "-=0.08",
        hideDuration: 0.15,
        textHideY: -15,
        textHideDuration: 0.12
      } : 
      {
        showDuration: 0.15,
        textOffset: "-=0.05", 
        textDelay: "+=0.1",
        hideOffset: "-=0.1",
        hideDuration: 0.2,
        textHideY: -20,
        textHideDuration: 0.15
      };
    
    return tl
      .to(whiteOverlayRef.current, { 
        ...ANIMATION_CONFIG.whiteOverlay.show,
        duration: config.showDuration
      })
      .to(overlayText, { 
        ...ANIMATION_CONFIG.text.show
      }, config.textOffset)
      .to(overlayText, { 
        ...ANIMATION_CONFIG.text.hide,
        y: config.textHideY,
        duration: config.textHideDuration
      }, config.textDelay)
      .to(whiteOverlayRef.current, { 
        ...ANIMATION_CONFIG.whiteOverlay.hide,
        duration: config.hideDuration
      }, config.hideOffset);
  }, []);

  // Cleanup ScrollTriggers function
  const cleanupScrollTriggers = useCallback(() => {
    scrollTriggersRef.current.forEach(trigger => {
      if (trigger && !trigger.killed) {
        trigger.kill();
      }
    });
    scrollTriggersRef.current = [];
  }, []);

  // Dropdown effect
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Use a more efficient approach with direct style manipulation for simple animations
    if (isDropdownVisible) {
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.to(overlay, {
        autoAlpha: 1,
        duration: ANIMATION_CONFIG.dropdown.duration,
      });
    } else {
      gsap.to(overlay, {
        autoAlpha: 0,
        duration: ANIMATION_CONFIG.dropdown.duration,
      });
    }
  }, [isDropdownVisible]);

  // Main scroll animations effect
  useEffect(() => {
    if (!showContent) return;

    const whiteOverlay = whiteOverlayRef.current;
    const overlayText = whiteOverlay?.querySelector('.overlay-text');
    
    if (!whiteOverlay || !overlayText) return;

    // Initialize white overlay and text once
    gsap.set(whiteOverlay, { 
      autoAlpha: 0,
      zIndex: 40
    });
    gsap.set(overlayText, { 
      autoAlpha: 0,
      y: 30,
      scale: 0.9
    });

    // Use requestAnimationFrame for better performance
    const setupAnimations = () => {
      const sections = gsap.utils.toArray(".scroll-section");
      
      if (sections.length === 0) {
        // Retry if sections not found yet
        requestAnimationFrame(setupAnimations);
        return;
      }

      // Clean up existing triggers
      cleanupScrollTriggers();
      
      // Create new ScrollTriggers more efficiently
      sections.forEach((section, index) => {
        if (index >= sections.length - 1) return;
        
        const nextSection = sections[index + 1];
        const nextSectionName = nextSection.getAttribute('data-section');
        const currentSectionName = section.getAttribute('data-section');
        const nextDisplayName = SECTION_NAMES[nextSectionName] || nextSectionName;
        const currentDisplayName = SECTION_NAMES[currentSectionName] || currentSectionName;
        
        // Create enter trigger
        const enterTrigger = ScrollTrigger.create({
          trigger: section,
          start: "bottom+=100 center",
          end: "bottom top",
          onEnter: () => createSectionTransition(overlayText, nextDisplayName),
          onLeaveBack: () => createSectionTransition(overlayText, currentDisplayName, true)
        });
        
        scrollTriggersRef.current.push(enterTrigger);
      });
    };

    // Use RAF for better performance
    requestAnimationFrame(setupAnimations);

    return cleanupScrollTriggers;
  }, [showContent, createSectionTransition, cleanupScrollTriggers]);

  // Memoize dropdown toggle handler
  const handleDropdownToggle = useCallback((visible) => {
    setDropdownVisible(visible);
  }, []);

  return (
    <div className="App">
      {textRefs && (
        <FullScreenTransition
          ref={transitionRef}
          textRefs={textRefs}
          text={TEXT}
        />
      )}
      
      {/* White Screen Overlay with Text */}
      <div
        ref={whiteOverlayRef}
        className="fixed inset-0 bg-white pointer-events-none flex items-center justify-center"
        style={{ zIndex: 40 }}
      >
        <div className="overlay-text text-4xl md:text-6xl font-bold text-gray-800 tracking-wider uppercase">
          {/* Text content will be dynamically updated */}
        </div>
      </div>
      
      <div
        ref={contentWrapperRef}
        style={{
          opacity: 0,
        }}
      >
        <Header
          isDropdownVisible={isDropdownVisible}
          onDropdownToggle={handleDropdownToggle}
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