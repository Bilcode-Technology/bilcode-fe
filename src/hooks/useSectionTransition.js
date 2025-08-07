import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Hook untuk animasi transisi antar section
 * Dapat digunakan untuk berbagai jenis animasi section seperti fade in, slide up, dll
 * @param {Object} ref - Ref element yang akan dianimasi
 * @param {Object} options - Opsi konfigurasi animasi
 */
export const useSectionTransition = (ref, options = {}) => {
  const {
    // Trigger configuration
    triggerElement = ref,
    start = "top 80%",
    end = "bottom 20%",
    
    // Animation properties
    fromProps = { opacity: 0, y: 50 },
    toProps = { opacity: 1, y: 0 },
    duration = 1,
    ease = "power2.out",
    delay = 0,
    
    // ScrollTrigger options
    scrub = false,
    toggleActions = "play none none reverse",
    markers = false,
    
    // Callbacks
    onStart = null,
    onComplete = null,
    onUpdate = null,
  } = options;

  useEffect(() => {
    const element = ref?.current;
    const trigger = triggerElement?.current || element;

    if (!element || !trigger) return;

    // Set initial state
    gsap.set(element, fromProps);

    // Create animation
    const animation = gsap.to(element, {
      ...toProps,
      duration: scrub ? undefined : duration,
      ease: scrub ? "none" : ease,
      delay: scrub ? undefined : delay,
      onStart: onStart,
      onComplete: onComplete,
      onUpdate: onUpdate,
      scrollTrigger: {
        trigger: trigger,
        start: start,
        end: end,
        scrub: scrub,
        toggleActions: toggleActions,
        markers: markers,
      },
    });

    return () => {
      animation.kill();
    };
  }, [ref, triggerElement, options]);
};

/**
 * Hook untuk animasi fade in section
 * @param {Object} ref - Ref element
 * @param {Object} options - Opsi tambahan
 */
export const useFadeInSection = (ref, options = {}) => {
  return useSectionTransition(ref, {
    fromProps: { opacity: 0 },
    toProps: { opacity: 1 },
    duration: 1.2,
    ease: "power2.out",
    ...options,
  });
};

/**
 * Hook untuk animasi slide up section
 * @param {Object} ref - Ref element
 * @param {Object} options - Opsi tambahan
 */
export const useSlideUpSection = (ref, options = {}) => {
  return useSectionTransition(ref, {
    fromProps: { opacity: 0, y: 100 },
    toProps: { opacity: 1, y: 0 },
    duration: 1,
    ease: "power3.out",
    ...options,
  });
};

/**
 * Hook untuk animasi slide in dari kiri
 * @param {Object} ref - Ref element
 * @param {Object} options - Opsi tambahan
 */
export const useSlideInLeft = (ref, options = {}) => {
  return useSectionTransition(ref, {
    fromProps: { opacity: 0, x: -100 },
    toProps: { opacity: 1, x: 0 },
    duration: 1,
    ease: "power3.out",
    ...options,
  });
};

/**
 * Hook untuk animasi slide in dari kanan
 * @param {Object} ref - Ref element
 * @param {Object} options - Opsi tambahan
 */
export const useSlideInRight = (ref, options = {}) => {
  return useSectionTransition(ref, {
    fromProps: { opacity: 0, x: 100 },
    toProps: { opacity: 1, x: 0 },
    duration: 1,
    ease: "power3.out",
    ...options,
  });
};

/**
 * Hook untuk animasi scale in
 * @param {Object} ref - Ref element
 * @param {Object} options - Opsi tambahan
 */
export const useScaleInSection = (ref, options = {}) => {
  return useSectionTransition(ref, {
    fromProps: { opacity: 0, scale: 0.8 },
    toProps: { opacity: 1, scale: 1 },
    duration: 1,
    ease: "back.out(1.7)",
    ...options,
  });
};

export default useSectionTransition;
