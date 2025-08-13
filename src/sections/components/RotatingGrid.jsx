import React, { useEffect, useMemo, useRef, useState } from "react";

// RotatingGrid: shows rows x cols cards, all backflipping and swapping to the next window
export default function RotatingGrid({ items, rows = 2, cols = 5, intervalMs = 3200 }) {
  const visible = Math.max(1, rows * cols);
  const [start, setStart] = useState(0);
  const [flip, setFlip] = useState(false);
  const timerRef = useRef(null);

  const data = useMemo(() => items.filter((it) => !!it?.name && !!it?.logo), [items]);

  // Build current window and next window (for back faces)
  const windowItems = useMemo(() => {
    if (data.length === 0) return [];
    const out = [];
    for (let i = 0; i < visible; i++) out.push(data[(start + i) % data.length]);
    return out;
  }, [data, start, visible]);

  const windowNextItems = useMemo(() => {
    if (data.length === 0) return [];
    const out = [];
    for (let i = 0; i < visible; i++) out.push(data[(start + visible + i) % data.length]);
    return out;
  }, [data, start, visible]);

  useEffect(() => {
    if (data.length <= 1) return;
    timerRef.current = setInterval(() => {
      setFlip(true);
      setTimeout(() => {
        setStart((s) => (s + visible) % data.length);
        setFlip(false);
      }, Math.min(700, intervalMs / 2));
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [data.length, intervalMs, visible]);

  if (!windowItems.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 place-items-center justify-items-center w-full">
      {windowItems.map((frontTech, i) => {
        const backTech = windowNextItems[i];
        return (
          <div
            key={`${frontTech.name}-${i}-${start}`}
            className="relative group w-full h-24 sm:h-28 md:h-36 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300"
            style={{ perspective: "1000px" }}
            onClick={(e) => {
              const ripple = document.createElement('span');
              ripple.className = 'absolute bg-blue-200/50 rounded-full pointer-events-none ripple';
              const rect = e.currentTarget.getBoundingClientRect();
              const size = Math.max(rect.width, rect.height);
              ripple.style.width = ripple.style.height = `${size}px`;
              ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
              ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
              e.currentTarget.appendChild(ripple);
              setTimeout(() => ripple.remove(), 500);
            }}
          >
            <div
              className={`w-full h-full relative transition-transform duration-700 ease-out ${flip ? "rotateY-180" : "rotateY-0"} group-hover:scale-[1.05]`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white to-[#f1f5fb] group-hover:from-[#eef5ff] group-hover:to-[#f0fcfc] transition-colors"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
              >
                <img src={frontTech.logo} alt={frontTech.name} className="h-8 sm:h-10 md:h-12 object-contain grayscale group-hover:grayscale-0 transition" />
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white to-[#f1f5fb] group-hover:from-[#eef5ff] group-hover:to-[#f0fcfc] transition-colors"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                {backTech ? (
                  <img src={backTech.logo} alt={backTech.name} className="h-8 sm:h-10 md:h-12 object-contain grayscale group-hover:grayscale-0 transition" />
                ) : null}
              </div>
            </div>
            <style>{`
              .ripple{ animation: ripple 500ms ease-out forwards; }
              @keyframes ripple{ from{ transform: scale(0); opacity: .5 } to{ transform: scale(2.5); opacity: 0 } }
            `}</style>
          </div>
        );
      })}
      <style>{`
        .rotateY-0 { transform: rotateY(0deg); }
        .rotateY-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}