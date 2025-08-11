import React, { useEffect, useMemo, useRef, useState } from "react";

// Displays two cards side-by-side. Every interval, both cards backflip (rotateX)
// and swap to the next pair of technologies. Smooth crossfade/flip transition.
export default function RotatingPairs({ items, intervalMs = 2800 }) {
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const timerRef = useRef(null);

  const pairs = useMemo(() => {
    const deduped = items.filter((it) => !!it?.name && !!it?.logo);
    if (deduped.length < 2) return [];
    // Build pairs: [0,1], [2,3], ... looping
    const res = [];
    for (let i = 0; i < deduped.length; i += 2) {
      res.push([deduped[i], deduped[(i + 1) % deduped.length]]);
    }
    return res;
  }, [items]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setFlip(true);
      // half-interval to progress index after mid-flip
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % pairs.length);
        setFlip(false);
      }, Math.min(600, intervalMs / 2));
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [pairs.length, intervalMs]);

  if (!pairs.length) return null;
  const [left, right] = pairs[index];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[left, right].map((tech, i) => (
        <div key={i} className="relative h-28 md:h-36 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm overflow-hidden"
             style={{ perspective: "1000px" }}>
          <div className={`w-full h-full relative transition-transform duration-700 ease-out ${flip ? "rotateX-180" : "rotateX-0"}`}
               style={{ transformStyle: "preserve-3d" }}>
            {/* Front: Logo */}
            <div className="absolute inset-0 flex items-center justify-center"
                 style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateX(0deg)" }}>
              <img src={tech.logo} alt={tech.name} className="h-12 md:h-14 object-contain grayscale" />
            </div>
            {/* Back: Tech name */}
            <div className="absolute inset-0 flex items-center justify-center"
                 style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
              <span className="text-base md:text-lg font-semibold text-gray-800">{tech.name}</span>
            </div>
          </div>
        </div>
      ))}
      <style>{`
        .rotateX-0 { transform: rotateX(0deg); }
        .rotateX-180 { transform: rotateX(180deg); }
      `}</style>
    </div>
  );
}

