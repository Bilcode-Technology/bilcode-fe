import PortfolioCard from "./PortfolioCard";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Portfolio = () => {
  const projects = [
    {
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
      partnerLabel: "WE PARTNERED WITH",
      title: "MARIAH CAREY TO CREATE",
      subtitle: "CONTENT WITH KAY JEWELERS",
      tag: "#jewelry",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
      partnerLabel: "WE PARTNERED WITH",
      title: "GLOBAL COFFEE CAMPAIGN",
      subtitle: "WITH PREMIUM ROASTS",
      tag: "#beverage",
    },
    {
      image:
        "https://images.unsplash.com/photo-1520975922284-7b6830f25a1b?q=80&w=1200&auto=format&fit=crop",
      partnerLabel: "WE PARTNERED WITH",
      title: "WINTER APPAREL LAUNCH",
      subtitle: "FOR OUTDOOR BRAND",
      tag: "#fashion",
    },
  ];
  const sectionRef = useRef(null);
  const descRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCTAClick = () => {
    const next = document.querySelector("#about");
    gsap.to(sectionRef.current, {
      yPercent: -100,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        next?.scrollIntoView({ behavior: "smooth" });
        gsap.set(sectionRef.current, {
          clearProps: "all",
          autoAlpha: 1,
          yPercent: 0,
        });
      },
    });
  };

  const rowRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = rowRef.current?.querySelectorAll("[data-portfolio-card]");
    if (!cards || cards.length === 0) {
      return;
    }

    cards.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { x: 120, opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          duration: Math.min(1.2, 0.9 + idx * 0.05),
          ease: "cubic-bezier(0.22, 1, 0.36, 1)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => {
            gsap.to(card, {
              scale: 1.03,
              duration: 0.2,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
            });
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Cursor-driven scroll and focus state
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const onMouseMove = (e) => {
      const rect = row.getBoundingClientRect();
      const pos = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      const t = pos / rect.width;
      const max = row.scrollWidth - row.clientWidth;
      gsap.to(row, { scrollLeft: t * max, duration: 0.4, ease: "power2.out" });
    };

    const updateActive = () => {
      const center = row.scrollLeft + row.clientWidth / 2;
      const cards = Array.from(row.querySelectorAll("[data-portfolio-card]"));
      let best = 0,
        bestDist = Infinity;
      cards.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const baseLeft = row.getBoundingClientRect().left;
        const cardCenter = r.left - baseLeft + row.scrollLeft + r.width / 2;
        const d = Math.abs(center - cardCenter);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIndex(best);
      cards.forEach((el, i) => {
        gsap.to(el, {
          scale: i === best ? 1 : 0.92,
          opacity: i === best ? 1 : 0.6,
          duration: 0.25,
          ease: "power2.out",
        });
      });
    };

    const supportsFine = window.matchMedia("(pointer: fine)").matches;
    if (supportsFine) row.addEventListener("mousemove", onMouseMove);
    row.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    updateActive();

    return () => {
      if (supportsFine) row.removeEventListener("mousemove", onMouseMove);
      row.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  // Fade description when activeIndex changes
  useEffect(() => {
    if (!descRef.current) return;
    gsap.fromTo(
      descRef.current,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
  }, [activeIndex]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>

        {/* Focused description */}
        <div ref={descRef} className="mt-4 min-h-[56px]">
          {projects[activeIndex] && !projects[activeIndex].cta && (
            <div className="text-gray-900">
              <div className="text-xs tracking-widest uppercase text-gray-500">
                {projects[activeIndex].partnerLabel}
              </div>
              <div className="font-extrabold">
                {projects[activeIndex].title}{" "}
                <span className="text-gray-700">
                  {projects[activeIndex].subtitle}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {projects[activeIndex].tag}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
