import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * Custom hook untuk mengelola animasi splash screen
 * @param {Object} refs - Object berisi transitionRef dan textRef
 * @param {Function} onComplete - Callback yang dipanggil setelah animasi selesai
 * @param {string} text - Teks yang akan dianimasi (default: "bilcode.id")
 * @param {Object} options - Opsi konfigurasi animasi
 */
export const useSplashAnimation = (
  refs,
  onComplete,
  text = "bilcode.id"
) => {

  useEffect(() => {
    const { transitionRef, textRef } = refs;
    const textElement = textRef?.current;
    const containerElement = transitionRef?.current;

    if (!textElement || !containerElement) return;

    // Buat spans untuk setiap karakter (sama seperti logic asli)
    textElement.innerHTML = "";
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      textElement.appendChild(span);
    });

    const chars = textElement.children;

    // Set container opacity (sama seperti logic asli)
    gsap.set(textElement, { opacity: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
        gsap.set(containerElement, { display: 'none' });
      },
    });

    // Animasi sequence (sama seperti logic asli)
    tl.to(containerElement, { y: "0%", duration: 1, ease: "power3.inOut" })
      .from(chars, {
        yPercent: 500, // Start far below the screen
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.05,
      }, "-=0.5")
      .to(chars, {
        yPercent: -500, // Exit far above the screen
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.05,
      }, "+=1.5")
      .to(containerElement, { y: "-100%", duration: 1, ease: "power3.inOut" });

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []); // Empty dependency array
};

export default useSplashAnimation;
