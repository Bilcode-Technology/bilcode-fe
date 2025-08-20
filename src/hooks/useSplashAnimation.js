import { useEffect, useMemo, useCallback, useRef } from 'react';
import { gsap } from 'gsap';

export const useSplashAnimation = (
  refs,
  onComplete,
  text = "bilcode.id",
  config = {}
) => {
  const { transitionRef, textRef } = refs || {};
  const cleanupRef = useRef();

  const defaultConfig = useMemo(() => ({
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!#$%^&*()_+-=[]{}|;:,.<>?',
    decryptCycles: 15,
    decryptSpeed: 0.05,
    entranceDuration: 1.2,
    exitDuration: 1.2,
    pauseDuration: 2.0,
    entranceEase: "power3.inOut",
    exitEase: "power3.inOut",
    glitchEffect: true,
    staggerDelay: 0.08,
    ...config
  }), [config]);

  const createAndAnimateParticles = useCallback((container, masterTl) => {
    const particles = [];
    const movementTweens = [];
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      const size = 2 + Math.random() * 4;
      particle.className = 'splash-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: #00ff88;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        z-index: -1;
        box-shadow: 0 0 10px #00ff88, 0 0 20px #00ff88;
      `;
      container.appendChild(particle);
      particles.push(particle);

      gsap.set(particle, {
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
      });

      masterTl.to(particle, {
        opacity: Math.random() * 0.5 + 0.2,
        duration: 0.5,
        ease: "power2.out"
      }, `-=${defaultConfig.entranceDuration * 0.7}`);

      const movementTween = gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      movementTweens.push(movementTween);
    }
    
    return { particles, movementTweens };
  }, [defaultConfig]);

  const createDecryptEffect = useCallback((charSpans, originalText) => {
    const decryptTl = gsap.timeline();
    const { charset, decryptCycles, decryptSpeed, staggerDelay, glitchEffect } = defaultConfig;

    charSpans.forEach((span, index) => {
      const originalChar = originalText[index];
      const charTl = gsap.timeline();

      charTl.set(span, { 
        opacity: 1,
        visibility: 'visible',
        color: "#000000" // Warna text hitam
      });

      for (let cycle = 0; cycle < decryptCycles; cycle++) {
        charTl.call(() => {
          const randomChar = charset[Math.floor(Math.random() * charset.length)];
          span.textContent = randomChar;
          
          if (glitchEffect) {
            gsap.set(span, {
              x: Math.random() * 4 - 2,
              y: Math.random() * 4 - 2,
              color: "#000000", // tetap hitam
              textShadow: "none"
            });
          }
        }, [], `+=${decryptSpeed}`);
      }

      charTl.call(() => {
        span.textContent = originalChar;
      })
      .to(span, {
        x: 0,
        y: 0,
        color: "#000000", // pastikan hitam
        textShadow: 'none',
        duration: 0.3,
        ease: "power2.out"
      }, "+=0.1");

      decryptTl.add(charTl, index * staggerDelay);
    });

    return decryptTl;
  }, [defaultConfig]);

  const createCharacterSpans = useCallback((textElement, text) => {
    textElement.innerHTML = "";
    
    return text.split("").map((char, index) => {
      const span = document.createElement("span");
      span.textContent = " ";
      span.className = `decrypt-char decrypt-char-${index}`;
      span.style.cssText = `
        display: inline-block;
        font-weight: normal; /* pakai default */
        font-family: inherit; /* default font */
        text-transform: none;
        opacity: 0;
        visibility: hidden;
        color: #000000; /* warna hitam */
        min-width: ${char === ' ' ? '0.5em' : '1ch'};
        text-align: center;
      `;
      textElement.appendChild(span);
      return span;
    });
  }, []);

  useEffect(() => {
    const textElement = textRef?.current;
    const containerElement = transitionRef?.current;
    
    if (!textElement || !containerElement) {
      console.warn('useSplashAnimation: Required refs are not available');
      return;
    }

    if (cleanupRef.current) {
      cleanupRef.current();
    }

    const originalText = text;
    const charSpans = createCharacterSpans(textElement, originalText);
    
    const masterTl = gsap.timeline({
      onComplete: () => {
        if (onComplete) {
          onComplete();
        }
        gsap.set(containerElement, { display: 'none' });
      },
    });

    gsap.set(containerElement, { 
      display: 'flex',
      y: "100%",
      opacity: 0 
    });

    const { particles, movementTweens } = createAndAnimateParticles(containerElement, masterTl);

    masterTl.to(containerElement, {
      y: "0%",
      opacity: 1,
      duration: defaultConfig.entranceDuration,
      ease: defaultConfig.entranceEase
    });

    // --- Tambahan: Scale in text dari tengah ---
    gsap.set(textElement, {
      scale: 0,
      transformOrigin: "center center",
      color: "#000000"
    });

    masterTl.to(textElement, {
      scale: 1,
      duration: 0.7,
      ease: "power3.out"
    }, `-=${defaultConfig.entranceDuration * 0.3}`);

    // Add decrypt effect
    const decryptAnimation = createDecryptEffect(charSpans, originalText);
    masterTl.add(decryptAnimation, `-=${defaultConfig.entranceDuration * 0.3}`);

    masterTl.to({}, { duration: defaultConfig.pauseDuration });

    masterTl.to(containerElement, {
      y: "-100%",
      opacity: 0,
      duration: defaultConfig.exitDuration,
      ease: defaultConfig.exitEase
    });

    masterTl.to(particles, {
      opacity: 0,
      duration: defaultConfig.exitDuration * 0.5,
    }, `-=${defaultConfig.exitDuration}`);

    cleanupRef.current = () => {
      masterTl.kill();
      movementTweens.forEach(tween => tween && tween.kill());
      particles.forEach(p => p?.parentNode?.removeChild(p));
      charSpans.forEach(span => span?.parentNode?.removeChild(span));
      if (textElement) textElement.innerHTML = '';
    };

    return cleanupRef.current;
    
  }, [
    text, 
    onComplete, 
    transitionRef, 
    textRef, 
    defaultConfig, 
    createDecryptEffect, 
    createAndAnimateParticles,
    createCharacterSpans
  ]);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);
};

export default useSplashAnimation;