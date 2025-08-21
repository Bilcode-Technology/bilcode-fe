import { useEffect, useMemo, useState, createRef } from "react";
import { gsap } from "gsap";

export const useSplashAnimation = (
  refs,
  onComplete,
  text = "bilcode.id",
  config = {}
) => {
  const { transitionRef, contentWrapperRef } = refs || {};
  const [textRefs] = useState(() =>
    (text || "").split("").map(() => createRef())
  );
  const [isMinTimePassed, setMinTimePassed] = useState(false);
  const [isContentLoaded, setContentLoaded] = useState(false);

  const defaultConfig = useMemo(
    () => ({
      charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      decryptCycles: 15,
      decryptSpeed: 0.05,
      entranceDuration: 1.2,
      exitDuration: 2.0,
      minDisplayTime: 2500,
      entranceEase: "power2.out",
      exitEase: "power2.inOut",
      ...config,
    }),
    [config]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, defaultConfig.minDisplayTime);
    return () => clearTimeout(timer);
  }, [defaultConfig.minDisplayTime]);

  useEffect(() => {
    const handleLoad = () => setContentLoaded(true);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    const container = transitionRef?.current;
    if (!container || !textRefs?.length) return;

    gsap.set(container, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      scale: 1,
      opacity: 0,
      transformOrigin: "center center",
    });

    textRefs.forEach((spanRef) => {
      const span = spanRef.current;
      if (span) {
        gsap.set(span, {
          display: "inline-block",
          opacity: 0,
        });
      }
    });

    const tl = gsap.timeline();

    tl.to(container, {
      opacity: 1,
      duration: defaultConfig.entranceDuration,
      ease: defaultConfig.entranceEase,
    });

    textRefs.forEach((spanRef, index) => {
      const span = spanRef.current;
      if (!span) return;

      const charData = { cycle: 0 };

      const charTl = gsap.timeline();
      charTl
        .to(span, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          charData,
          {
            cycle: defaultConfig.decryptCycles,
            duration: defaultConfig.decryptCycles * defaultConfig.decryptSpeed,
            ease: "none",
            onUpdate: () => {
              if (span) {
                span.textContent =
                  defaultConfig.charset[
                    Math.floor(Math.random() * defaultConfig.charset.length)
                  ];
              }
            },
          },
          "+=0.1"
        )
        .to(span, {
          textContent: text[index] || "",
          duration: defaultConfig.decryptSpeed,
          ease: "none",
        });

      tl.add(charTl, 0.2 + index * 0.1);
    });

    return () => tl.kill();
  }, [text, textRefs, transitionRef, defaultConfig]);

  useEffect(() => {
    if (isMinTimePassed && isContentLoaded) {
      const container = transitionRef?.current;
      if (!container) return;

      gsap.killTweensOf(container);

      const exitTl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { display: "none" });
          if (contentWrapperRef?.current) {
            gsap.to(contentWrapperRef.current, {
              opacity: 1,
              duration: 0.8,
              ease: "ease-in-out",
            });
          }
          onComplete?.();
        },
      });

      exitTl.to(container, {
        opacity: 0,
        duration: defaultConfig.exitDuration,
        ease: defaultConfig.exitEase,
      });
    }
  }, [
    isMinTimePassed,
    isContentLoaded,
    transitionRef,
    contentWrapperRef,
    defaultConfig,
    onComplete,
  ]);

  return {
    textRefs,
    isMinTimePassed,
    isContentLoaded,
    isReady: isMinTimePassed && isContentLoaded,
  };
};

export default useSplashAnimation;