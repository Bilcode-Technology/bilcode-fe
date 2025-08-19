import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useFullScreenSectionTransition = (transitionRef, textRef) => {
  const timelineRef = useRef(null);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const sections = gsap.utils.toArray('.tracked-section');

    const runTransition = (section) => {
      if (isTransitioningRef.current) return;

      isTransitioningRef.current = true;

      const sectionName = section.dataset.sectionName || ' ';

      timelineRef.current = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 200); // Cooldown period
        }
      });
      
      timelineRef.current
        .set(transitionRef.current, { y: '100%', autoAlpha: 1 })
        .to(transitionRef.current, {
          y: '0%',
          duration: 0.5,
          ease: 'power3.inOut',
        })
        .add(() => {
          if (textRef.current) {
            textRef.current.textContent = sectionName;
          }
        })
        .fromTo(
          textRef.current,
          { y: 50, opacity: 0, skewX: -10 },
          { y: 0, opacity: 1, skewX: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.2'
        )
        .to(transitionRef.current, {
          y: '-100%',
          duration: 0.5,
          ease: 'power3.inOut',
        }, '+=0.7')
        .to(textRef.current, {
          opacity: 0,
          duration: 0.3,
        }, '-=0.5');
    }

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        onEnter: () => runTransition(section),
      });
      
      ScrollTrigger.create({
        trigger: section,
        start: 'bottom 50%',
        onEnterBack: () => runTransition(section),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [transitionRef, textRef]);
};

export default useFullScreenSectionTransition;
