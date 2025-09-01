import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const SponsorsRotator = ({ items = [], interval = 1.8, className = "" }) => {
  const wrapperRef = useRef(null);
  const animationContextRef = useRef(null);
  const timelineRef = useRef(null);
  const [currentLogos, setCurrentLogos] = useState(items);

  const shuffleLogos = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setCurrentLogos(shuffled);
  };

  useLayoutEffect(() => {
    animationContextRef.current = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const logoElements = wrapper.querySelectorAll(".sponsor-logo");

      // Set initial states
      gsap.set(logoElements, {
        autoAlpha: 0,
        scale: 0,
      });

      // Create main timeline
      timelineRef.current = gsap.timeline({
        id: "sponsors-rotator",
        repeat: -1,
        onRepeat: shuffleLogos, // Shuffle logos when animation repeats
      });

      // Single animation cycle
      const tl = gsap.timeline();

      // Animate all logos in
      tl.to(logoElements, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.3,
        // stagger: 0.2,
        ease: "back.out(1.7)",
      })
        // Hold state
        .to({}, { duration: interval })
        // Animate all logos out
        .to(logoElements, {
          autoAlpha: 0,
          scale: 0,
          duration: 0.3,
          // stagger: 0.2,
          ease: "back.in(1.7)",
        });

      // Add to main timeline
      timelineRef.current.add(tl);
    }, wrapperRef.current);

    return () => {
      if (animationContextRef.current) {
        animationContextRef.current.revert();
      }
    };
  }, [interval, currentLogos]); // Changed dependency to currentLogos

  return (
    <div
      ref={wrapperRef}
      className={`flex items-center justify-center gap-10 ${className}`}
    >
      {currentLogos.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          className="sponsor-logo h-10 flex items-center justify-center"
        >
          <img
            src={item.logo}
            alt={item.name}
            className="h-10 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default SponsorsRotator;
