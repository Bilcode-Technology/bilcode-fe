import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollRevealSection = ({ children, className }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;
    // Target all direct children of the section for animation
    const animatedElements = element.children;

    // Set initial state for elements to be animated
    gsap.set(animatedElements, { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%', // When the top of the trigger hits 80% of the viewport height
      end: 'bottom 20%', // When the bottom of the trigger leaves 20% of the viewport height
      
      onEnter: () => 
        gsap.to(animatedElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }),
      onLeave: () => 
        gsap.to(animatedElements, {
          opacity: 0,
          y: -50,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.in',
        }),
      onEnterBack: () => 
        gsap.to(animatedElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }),
      onLeaveBack: () => 
        gsap.to(animatedElements, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.in',
        }),
    });

    // Cleanup function for ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);

  return (
    <section ref={sectionRef} className={`py-20 ${className || ''}`}>
      {children}
    </section>
  );
};

export default ScrollRevealSection;