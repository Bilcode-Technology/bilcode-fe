import { useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";

// Simple, performant marquee that loops horizontally using GSAP
// - Duplicates items to create a seamless loop
// - Computes duration based on content width and speed (px/sec)
// - Pauses on hover; resumes on leave
// - Responsive and bounded by parent container (overflow-hidden)

const SponsorsMarquee = ({ items = [], speed = 80, className = "" }) => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const tlRef = useRef(null);

  // Duplicate items for seamless loop
  const loopItems = useMemo(() => [...items, ...items], [items]);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track || !items.length) return;

    // Ensure fresh measurements
    gsap.set(track, { x: 0 });

    // Measure total width of the first half (original items)
    let halfWidth = 0;
    const children = Array.from(track.children);
    const halfCount = children.length / 2;
    for (let i = 0; i < halfCount; i++) {
      const el = children[i];
      halfWidth += el.offsetWidth;
      // add gap (matches Tailwind gap-x-10 -> 2.5rem = 40px) via computed margin-right
      const style = window.getComputedStyle(el);
      halfWidth += parseFloat(style.marginRight || 0);
    }

    const duration = Math.max(halfWidth / speed, 8); // seconds

    // Create/update timeline
    if (tlRef.current) tlRef.current.kill();
    const tl = gsap.to(track, {
      x: -halfWidth,
      duration,
      ease: "none",
      repeat: -1,
      onRepeat: () => gsap.set(track, { x: 0 }),
    });
    tlRef.current = tl;

    // Pause/resume on hover
    const onEnter = () => gsap.to(tl, { timeScale: 0, duration: 0.3, ease: "power2.out" });
    const onLeave = () => gsap.to(tl, { timeScale: 1, duration: 0.3, ease: "power2.out" });
    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);

    // Handle resize: re-measure and rebuild
    const onResize = () => {
      if (tlRef.current) tlRef.current.kill();
      gsap.set(track, { x: 0 });
      // defer to next frame for accurate offsetWidth
      requestAnimationFrame(() => {
        let w = 0;
        for (let i = 0; i < halfCount; i++) {
          const el = children[i];
          w += el.offsetWidth;
          const style = window.getComputedStyle(el);
          w += parseFloat(style.marginRight || 0);
        }
        const d = Math.max(w / speed, 8);
        tlRef.current = gsap.to(track, {
          x: -w,
          duration: d,
          ease: "none",
          repeat: -1,
          onRepeat: () => gsap.set(track, { x: 0 }),
        });
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      wrapper.removeEventListener("mouseenter", onEnter);
      wrapper.removeEventListener("mouseleave", onLeave);
      if (tlRef.current) tlRef.current.kill();
    };
  }, [items, speed]);

  return (
    <div
      ref={wrapperRef}
      className={`w-full overflow-hidden select-none py-4 opacity-80 ${className}`}
      aria-label="Trusted by our partners"
    >
      <div ref={trackRef} className="flex items-center gap-x-10 will-change-transform">
        {loopItems.map((label, i) => (
          <div
            key={`${label}-${i}`}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-6 h-6 rounded-full bg-black/80" aria-hidden="true" />
            <span className="text-lg font-semibold tracking-tight text-gray-900">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorsMarquee;

