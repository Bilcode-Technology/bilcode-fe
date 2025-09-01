import { useRef, useState, useLayoutEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { gsap } from "gsap";
import { useSplashAnimation } from "../hooks/useSplashAnimation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FullScreenTransition from "../components/FullScreenTransition";

const TEXT = "bilcode.id";

const MainLayout = ({ navItems }) => {
  const [isSplashing, setIsSplashing] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Refs
  const transitionRef = useRef(null);
  const overlayRef = useRef(null); // dropdown overlay
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

      {/* Content */}
      <div ref={contentWrapperRef} style={{ opacity: 0 }}>
        <Header
          isDropdownVisible={isDropdownVisible}
          onDropdownToggle={setDropdownVisible}
          navItems={navItems}
        />

        {/* Dropdown Overlay */}
        <div ref={overlayRef} className="fixed inset-0 bg-black/30 z-30" />

        <Outlet />

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
