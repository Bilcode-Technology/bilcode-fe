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

function App() {
  const [showContent, setShowContent] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const transitionRef = useRef(null);
  const overlayRef = useRef(null);
  const whiteOverlayRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const text = "bilcode.id";
  
  const { textRefs } = useSplashAnimation(
    { transitionRef, contentWrapperRef },
    () => {
      setShowContent(true);
    },
    text
  );

  useEffect(() => {
    gsap.set(overlayRef.current, { autoAlpha: 0 });
    gsap.to(overlayRef.current, {
      autoAlpha: isDropdownVisible ? 1 : 0,
      duration: 0.3,
    });
  }, [isDropdownVisible]);

  useEffect(() => {
    if (showContent) {
      const whiteOverlay = whiteOverlayRef.current;
      const overlayText = whiteOverlay.querySelector('.overlay-text');
      
      // Initialize white overlay and text
      gsap.set(whiteOverlay, { 
        autoAlpha: 0,
        zIndex: 40
      });
      gsap.set(overlayText, { 
        autoAlpha: 0,
        y: 30,
        scale: 0.9
      });

      const sections = gsap.utils.toArray(".scroll-section");
      
      // Section names mapping
      const sectionNames = {
        'hero': 'Home',
        'services': 'Services',
        'portfolio': 'Portfolio', 
        'team': 'Our Team',
        'testimonials': 'Testimonials',
        'contact': 'Contact'
      };
      
      // Clear any existing ScrollTriggers for white overlay
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === 'white-overlay') {
          trigger.kill();
        }
      });

      // Create white screen transitions between sections
      sections.forEach((section, index) => {
        // Skip the last section as there's no next section
        if (index >= sections.length - 1) return;
        
        const nextSection = sections[index + 1];
        const nextSectionName = nextSection.getAttribute('data-section');
        const displayName = sectionNames[nextSectionName] || nextSectionName;
        
        // Create a more precise trigger point
        ScrollTrigger.create({
          id: 'white-overlay',
          trigger: section,
          start: "bottom+=100 center", // Start when section bottom is 100px past center
          end: "bottom top", // End when section bottom reaches top
          onEnter: () => {
            // Update text content
            overlayText.textContent = displayName;
            
            // Flash white with text animation when transitioning to next section
            const tl = gsap.timeline();
            
            tl.to(whiteOverlay, { 
                autoAlpha: 1, 
                duration: 0.15, 
                ease: "power2.out" 
              })
              .to(overlayText, { 
                autoAlpha: 1, 
                y: 0, 
                scale: 1,
                duration: 0.2, 
                ease: "back.out(1.7)" 
              }, "-=0.05")
              .to(overlayText, { 
                autoAlpha: 0, 
                y: -20, 
                scale: 0.95,
                duration: 0.15, 
                ease: "power2.in" 
              }, "+=0.1")
              .to(whiteOverlay, { 
                autoAlpha: 0, 
                duration: 0.2, 
                ease: "power2.inOut" 
              }, "-=0.1");
          },
          onLeaveBack: () => {
            // Get current section name when scrolling back
            const currentSectionName = section.getAttribute('data-section');
            const displayName = sectionNames[currentSectionName] || currentSectionName;
            overlayText.textContent = displayName;
            
            // Optional: Flash when scrolling back up
            const tl = gsap.timeline();
            
            tl.to(whiteOverlay, { 
                autoAlpha: 1, 
                duration: 0.1, 
                ease: "power2.out" 
              })
              .to(overlayText, { 
                autoAlpha: 1, 
                y: 0, 
                scale: 1,
                duration: 0.15, 
                ease: "back.out(1.7)" 
              }, "-=0.05")
              .to(overlayText, { 
                autoAlpha: 0, 
                y: -15, 
                scale: 0.95,
                duration: 0.12, 
                ease: "power2.in" 
              }, "+=0.08")
              .to(whiteOverlay, { 
                autoAlpha: 0, 
                duration: 0.15, 
                ease: "power2.inOut" 
              }, "-=0.08");
          }
        });
      });

      // Alternative approach: Create smooth scrub-based transitions
      // Uncomment this section if you prefer smooth scrub-based animations
      /*
      sections.forEach((section, index) => {
        if (index >= sections.length - 1) return;
        
        const nextSection = sections[index + 1];
        
        ScrollTrigger.create({
          id: 'white-overlay-scrub',
          trigger: section,
          start: "bottom center",
          endTrigger: nextSection,
          end: "top center",
          scrub: 1,
          animation: gsap.timeline()
            .to(whiteOverlay, { 
              autoAlpha: 1, 
              duration: 0.3, 
              ease: "none" 
            })
            .to(whiteOverlay, { 
              autoAlpha: 0, 
              duration: 0.7, 
              ease: "none" 
            })
        });
      });
      */
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === 'white-overlay' || trigger.vars.id === 'white-overlay-scrub') {
          trigger.kill();
        }
      });
    };
  }, [showContent]);

  return (
    <div className="App">
      {textRefs && (
        <FullScreenTransition
          ref={transitionRef}
          textRefs={textRefs}
          text={text}
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