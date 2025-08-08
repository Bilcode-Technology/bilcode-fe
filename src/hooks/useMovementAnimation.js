import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook untuk mengelola animasi movement/scroll sections
 * @param {Object} refs - Object berisi containerRef, scrollContainerRef, dan cardsRef
 * @param {Array} items - Array item yang akan dianimasi
 * @param {Object} options - Opsi konfigurasi animasi
 */
export const useMovementAnimation = (refs, items = [], options = {}) => {
  const {
    // Dimensi card
    cardWidth = 400,
    cardGap = 32,
    cardHeight = 500,
    
    // Scroll configuration
    scrubAmount = 1,
    pinSection = true,
    anticipatePin = 1,
    
    // Card animation states
    inactiveOpacity = 0.6,
    activeOpacity = 1,
    inactiveScale = 0.9,
    activeScale = 1.1,
    
    // Active card detection
    activeThreshold = 0.3,
    
    // Scroll trigger positions
    startPosition = "top top",
    endOffset = 100,
    
    // Animation easing
    ease = "none",
  } = options;

  useEffect(() => {
    const { containerRef, scrollContainerRef, cardsRef } = refs;
    const container = scrollContainerRef?.current;
    const cards = cardsRef?.current || [];
    const triggerElement = containerRef?.current;

    if (!container || !triggerElement || cards.length === 0) return;

    // Calculate total width for horizontal scroll
    const totalWidth = (cardWidth + cardGap) * items.length;

    // Set up horizontal scroll container
    gsap.set(container, {
      width: totalWidth,
      display: "flex",
      gap: `${cardGap}px`,
    });

    // Set initial card states
    gsap.set(cards, {
      opacity: inactiveOpacity,
      scale: inactiveScale,
      width: cardWidth,
    });

    // Create horizontal scroll animation
    const scrollTween = gsap.to(container, {
      x: () => -(totalWidth - window.innerWidth + endOffset),
      ease: ease,
      scrollTrigger: {
        trigger: triggerElement,
        start: startPosition,
        end: () => `+=${totalWidth}`,
        scrub: scrubAmount,
        pin: pinSection,
        anticipatePin: anticipatePin,
      },
    });

    // Individual card animations
    const cardTriggers = cards.map((card, index) => {
      return ScrollTrigger.create({
        trigger: triggerElement,
        start: startPosition,
        end: () => `+=${totalWidth}`,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const cardProgress = progress * items.length;
          const cardIndex = Math.floor(cardProgress);
          const cardOffset = cardProgress - cardIndex;

          if (index === cardIndex) {
            // Active card - scale and opacity based on center position
            const centerDistance = Math.abs(cardOffset - 0.5) * 2;
            const scale = inactiveScale + (1 - centerDistance) * (activeScale - inactiveScale);
            const opacity = inactiveOpacity + (1 - centerDistance) * (activeOpacity - inactiveOpacity);

            gsap.set(card, {
              scale: scale,
              opacity: opacity,
            });

            // Add/remove active class based on threshold
            if (Math.abs(cardOffset - 0.5) < activeThreshold) {
              card.classList.add("active");
            } else {
              card.classList.remove("active");
            }
          } else if (index === cardIndex + 1 && cardOffset > 0.5) {
            // Next card coming into view
            const nextProgress = (cardOffset - 0.5) * 2;
            const scale = inactiveScale + nextProgress * (activeScale - inactiveScale) * 0.5;
            const opacity = inactiveOpacity + nextProgress * (activeOpacity - inactiveOpacity) * 0.5;

            gsap.set(card, {
              scale: scale,
              opacity: opacity,
            });
            card.classList.remove("active");
          } else {
            // Inactive cards
            gsap.set(card, {
              scale: inactiveScale,
              opacity: inactiveOpacity,
            });
            card.classList.remove("active");
          }
        },
      });
    });

    // Cleanup function
    return () => {
      scrollTween.kill();
      cardTriggers.forEach(trigger => trigger.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [refs, items, options]);
};

/**
 * Hook untuk animasi section transition sederhana
 * @param {Object} ref - Ref element yang akan dianimasi
 * @param {Object} options - Opsi animasi
 */
export const useSectionTransition = (ref, options = {}) => {
  const {
    triggerElement = ref,
    fromProps = { opacity: 0, y: 50 },
    toProps = { opacity: 1, y: 0 },
    duration = 1,
    ease = "power2.out",
    start = "top 80%",
    end = "bottom 20%",
    scrub = false,
  } = options;

  useEffect(() => {
    const element = ref?.current;
    const trigger = triggerElement?.current || element;

    if (!element || !trigger) return;

    // Set initial state
    gsap.set(element, fromProps);

    // Create scroll trigger animation
    const scrollTrigger = gsap.to(element, {
      ...toProps,
      duration: scrub ? undefined : duration,
      ease: scrub ? "none" : ease,
      scrollTrigger: {
        trigger: trigger,
        start: start,
        end: end,
        scrub: scrub,
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [ref, triggerElement, options]);
};

export default useMovementAnimation;
