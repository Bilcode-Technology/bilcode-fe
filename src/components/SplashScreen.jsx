import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './SplashScreen.css';

const SplashScreen = () => {
  const splashRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const chars = textRef.current.querySelectorAll('span');
    gsap.set(chars, { y: 50, opacity: 0 });

    gsap.to(chars, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        setTimeout(() => {
          gsap.to(splashRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              splashRef.current.style.display = 'none';
            },
          });
        }, 1000);
      },
    });
  }, []);

  return (
    <div className="splash-screen" ref={splashRef}>
      <h1 className="splash-text" ref={textRef}>
        {'bilcode.id'.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </h1>
    </div>
  );
};

export default SplashScreen;
