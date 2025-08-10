import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";

// Crossfade rotator: a single row of fixed slots. Logos in each slot
// crossfade (fade + scale + slight rotate) to the next brand periodically.
// - No horizontal movement; purely visual transitions
// - Pauses on hover; resumes on leave
// - Responsive visible slot count (mobile/tablet/desktop)
// - Uses two layers per slot to crossfade without reflow

const getVisibleCount = () => {
  const w = window.innerWidth;
  if (w < 640) return 3; // mobile
  if (w < 1024) return 4; // tablet
  return 6; // desktop
};

const SponsorsRotator = ({
  items = [],
  interval = 1.8, // seconds between switches
  className = "",
}) => {
  const wrapperRef = useRef(null);
  const slotsRef = useRef([]); // array of slot refs (each slot contains layerA, layerB)
  const activeLayerRef = useRef([]); // 0 or 1 per slot
  const startIndexRef = useRef(0);
  const visibleCountRef = useRef(6);
  const tickerRef = useRef(null);
  const pausedRef = useRef(false);

  const pool = useMemo(() => (items.length ? [...items] : [{ name: "Your Brand" }]), [items]);

  // Ensure list long enough
  const atLeast = (n) => {
    if (pool.length >= n) {
      return pool;
    }
    const dup = [];
    for (let i = 0; i < n; i++) {
      dup.push(pool[i % pool.length]);
    }
    return dup;
  };
  // Helper to set logo + label into a layer without relying on Tailwind runtime class scanning
  const setLayerContent = (layer, item) => {
    if (!layer || !item) {
      return;
    }
    layer.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.style.display = "flex";
    wrap.style.alignItems = "center";
    wrap.style.gap = "8px"; // 0.5rem

    if (item.logo) {
      const img = document.createElement("img");
      img.src = item.logo;
      img.alt = item.name || "Logo";
      img.loading = "lazy";
      img.style.height = "24px"; // ~h-6
      img.style.width = "auto";
      img.style.objectFit = "contain";
      wrap.appendChild(img);
    }

    const text = document.createElement("span");
    text.textContent = item.name || "";
    text.style.fontWeight = 600;
    text.style.fontSize = "1rem"; // text-base
    text.style.letterSpacing = "-0.01em";
    text.style.color = "#111827"; // gray-900
    wrap.appendChild(text);

    layer.appendChild(wrap);
  };


  const renderSlots = (count) => {
    const filled = atLeast(count);
    // initialize DOM content for both layers in each slot
    slotsRef.current.forEach((slot, idx) => {
      if (!slot) return;
      const [layerA, layerB] = slot.children;
      const label = filled[idx % filled.length];
      const item = typeof label === "string" ? { name: label } : label;
      setLayerContent(layerA, item);
      setLayerContent(layerB, item);
      // layerA visible; layerB hidden initially
      gsap.set(layerA, { autoAlpha: 1 });
      gsap.set(layerB, { autoAlpha: 0 });
      activeLayerRef.current[idx] = 0;
    });
  };

  // Switch to next set (advance startIndexRef by 1); crossfade each slot
  const advance = () => {
    const count = visibleCountRef.current;
    const filled = atLeast(count + 1);
    startIndexRef.current = (startIndexRef.current + 1) % filled.length;

    for (let i = 0; i < count; i++) {
      const slot = slotsRef.current[i];
      if (!slot) {
        continue;
      }
      const [layerA, layerB] = slot.children;
      const nextLabel = filled[(startIndexRef.current + i) % filled.length];
      const active = activeLayerRef.current[i] || 0;
      const showEl = active === 0 ? layerB : layerA;
      const hideEl = active === 0 ? layerA : layerB;

      const nextItem = typeof nextLabel === "string" ? { name: nextLabel } : nextLabel;
      setLayerContent(showEl, nextItem);
      // crossfade only
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(hideEl, { autoAlpha: 0, duration: 0.35 }, 0)
        .fromTo(
          showEl,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.45 },
          0.05
        );

      activeLayerRef.current[i] = active === 0 ? 1 : 0;
    }
  };

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const onEnter = () => {
      pausedRef.current = true;
    };
    const onLeave = () => {
      pausedRef.current = false;
    };
    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);

    // create slots count
    const updateCount = () => {
      visibleCountRef.current = getVisibleCount();
      // (Re)render initial content
      renderSlots(visibleCountRef.current);
    };

    updateCount();
    const onResize = () => {
      updateCount();
    };
    window.addEventListener("resize", onResize);

    // ticker that advances every interval seconds
    let acc = 0;
    const tick = (_time, delta) => {
      if (pausedRef.current) {
        return;
      }
      acc += delta / 1000; // ms → s
      if (acc >= interval) {
        acc = 0;
        advance();
      }
    };
    gsap.ticker.add(tick);
    tickerRef.current = tick;

    return () => {
      window.removeEventListener("resize", onResize);
      wrapper.removeEventListener("mouseenter", onEnter);
      wrapper.removeEventListener("mouseleave", onLeave);
      if (tickerRef.current) {
        gsap.ticker.remove(tickerRef.current);
      }
    };
  }, [interval, pool]);

  return (
    <div ref={wrapperRef} className={`w-full opacity-80 ${className}`}>
      <div className="flex items-center justify-center gap-x-10 flex-nowrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (slotsRef.current[i] = el)}
            className="relative h-8 flex items-center gap-2 select-none will-change-transform"
            style={{ width: "auto" }}
          >
            <div className="absolute inset-0 flex items-center gap-2" style={{ willChange: "opacity" }}></div>
            <div className="relative flex items-center gap-2" style={{ willChange: "opacity" }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorsRotator;

