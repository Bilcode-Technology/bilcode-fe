import { useLayoutEffect, useState, createRef } from "react";
import { gsap } from "gsap";

export const useSplashAnimation = (refs, onComplete, text = "bilcode.id") => {
  const { transitionRef, contentWrapperRef } = refs || {};
  const [textRefs] = useState(() =>
    (text || "").split("").map(() => createRef())
  );

  useLayoutEffect(() => {
    if (!transitionRef?.current || !contentWrapperRef?.current) return;

    const masterTimeline = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    const container = transitionRef.current;
    const content = contentWrapperRef.current;
    const chars = textRefs.map((ref) => ref.current).filter(Boolean);

    // Initial setup
    gsap.set(container, { autoAlpha: 1 });
    gsap.set(content, { autoAlpha: 0 });
    gsap.set(chars, { autoAlpha: 0 });

    // Decrypt animation
    const decryptTimeline = gsap.timeline();
    chars.forEach((char, index) => {
      const charData = { cycle: 0 };
      decryptTimeline.to(
        char,
        { autoAlpha: 1, duration: 0.1 },
        index * 0.05
      );
      decryptTimeline.to(
        charData,
        {
          cycle: 10,
          duration: 0.5,
          ease: "none",
          onUpdate: () => {
            char.textContent = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
          },
        },
        index * 0.05
      );
      decryptTimeline.to(
        char,
        { textContent: text[index], duration: 0 },
        index * 0.05 + 0.5
      );
    });

    masterTimeline
      .add(decryptTimeline) // Add decrypt animation
      .to(container, { autoAlpha: 0, duration: 0.8, delay: 1.5 }) // Fade out splash screen after a delay
      .set(container, { display: "none" })
      .to(content, { autoAlpha: 1, duration: 0.8 }, "-=.5"); // Fade in main content

    return () => {
      masterTimeline.kill();
    };
  }, [text, transitionRef, contentWrapperRef, onComplete, textRefs]);

  return { textRefs };
};

export default useSplashAnimation;
