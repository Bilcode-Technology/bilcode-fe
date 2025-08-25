import { useLayoutEffect, useMemo, createRef, useState } from "react";
import { gsap } from "gsap";

export const useSplashAnimation = (refs, onComplete, text = "bilcode.id") => {
  const { transitionRef, contentWrapperRef } = refs || {};
  const [error, setError] = useState(null);

  const textRefs = useMemo(
    () => Array.from({ length: text.length }, () => createRef()),
    [text]
  );

  useLayoutEffect(() => {
    if (!transitionRef?.current || !contentWrapperRef?.current) {
      return;
    }

    try {
      const container = transitionRef.current;
      const content = contentWrapperRef.current;
      const chars = textRefs.map((ref) => ref.current).filter(Boolean);

      if (chars.length !== text.length) {
        return;
      }

      const ctx = gsap.context(() => {
        gsap.set(container, { autoAlpha: 1, display: "flex" });
        gsap.set(content, { autoAlpha: 0 });
        gsap.set(chars, { autoAlpha: 0 });

        const masterTimeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => onComplete?.(),
        });

        const decryptTimeline = gsap.timeline();
        chars.forEach((char, index) => {
          if (!char) return;

          const charData = { cycle: 0 };

          decryptTimeline.to(char, { autoAlpha: 1, duration: 0.1 }, index * 0.05);

          decryptTimeline.to(
            charData,
            {
              cycle: 10,
              duration: 0.5,
              ease: "none",
              onUpdate: () => {
                if (char) {
                  char.textContent = String.fromCharCode(
                    Math.floor(Math.random() * 94) + 33
                  );
                }
              },
            },
            index * 0.05
          );

          decryptTimeline.set(
            char,
            { textContent: text[index] },
            index * 0.05 + 0.5
          );
        });

        masterTimeline
          .add(decryptTimeline)
          .to(container, { autoAlpha: 0, duration: 0.8, delay: 1.2 })
          .set(container, { display: "none" })
          .to(content, { autoAlpha: 1, duration: 0.8 }, "-=0.5");
      });

      return () => ctx.revert();
    } catch (err) {
      console.error("Error in useSplashAnimation:", err);
      setError(err);
    }
  }, [text, transitionRef, contentWrapperRef, onComplete, textRefs]);

  return { textRefs, error };
};