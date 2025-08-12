import {
  ChartPie,
  Component,
  GraduationCap,
  Monitor,
  Smartphone,
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serviceItems = [
  {
    icon: <Monitor size={32} />,
    title: "Web Development",
    description: "Gathering comprehensive datasets...",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Mobile Development",
    description: "Cleaning, processing...",
  },
  {
    icon: <Component size={32} />,
    title: "UI UX Design",
    description: "Training sophisticated AI models...",
  },
  {
    icon: <ChartPie size={32} />,
    title: "Data Analyst",
    description: "Rigorous testing and validation...",
  },
  {
    icon: <GraduationCap size={32} />,
    title: "IT Academy",
    description: "Rigorous testing and validation...",
  },
];

const COLLAPSED_WIDTH = 200;
const EXPANDED_WIDTH = 600;

const Services = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const cardPositionsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Tambah padding supaya card pertama & terakhir bisa center
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updatePadding = () => {
      const basePad = window.innerWidth / 2 - EXPANDED_WIDTH / 2;
      const padLeft = basePad; // untuk card pertama
      const padRight = basePad + window.innerWidth * 0.2; // extra 20% untuk card terakhir
      container.style.paddingLeft = `${padLeft}px`;
      container.style.paddingRight = `${padRight}px`;
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  // Hitung posisi target center tiap card
  const calculateCardPositions = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const scrollLeft = container.scrollLeft;

    cardPositionsRef.current = cardsRef.current.map((card, i) => {
      if (!card) return 0;
      const rect = card.getBoundingClientRect();
      const cardCenter =
        rect.left - containerRect.left + scrollLeft + rect.width / 2;
      const viewportCenter = window.innerWidth / 2;
      let delta = cardCenter - viewportCenter;

      // offset khusus untuk card terakhir: geser 10% setelah tengah
      if (i === cardsRef.current.length - 1) {
        delta -= window.innerWidth * 0.1;
      }
      return delta;
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    calculateCardPositions();
    window.addEventListener("resize", calculateCardPositions);

    gsap.to(container, {
      x: () => -cardPositionsRef.current[0],
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => cardPositionsRef.current.at(-1) + window.innerWidth, // total scroll panjang
        scrub: false,
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: (value) => {
            // Pilih index card terdekat berdasarkan posisi scroll
            const scrollPos = value * (cardPositionsRef.current.at(-1) || 0);
            let closestIndex = 0;
            let minDist = Infinity;
            cardPositionsRef.current.forEach((pos, i) => {
              const dist = Math.abs(scrollPos - pos);
              if (dist < minDist) {
                minDist = dist;
                closestIndex = i;
              }
            });
            setActiveIndex(closestIndex);
            return (
              cardPositionsRef.current[closestIndex] /
              (cardPositionsRef.current.at(-1) || 1)
            );
          },
          duration: 0.5,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const scrollPos =
            self.progress * (cardPositionsRef.current.at(-1) || 0);
          let closestIndex = 0;
          let minDist = Infinity;
          cardPositionsRef.current.forEach((pos, i) => {
            const dist = Math.abs(scrollPos - pos);
            if (dist < minDist) {
              minDist = dist;
              closestIndex = i;
            }
          });
          gsap.to(container, {
            x: -cardPositionsRef.current[closestIndex],
            duration: 0.5,
            ease: "power2.inOut",
          });
        },
        invalidateOnRefresh: true,
        onRefresh: calculateCardPositions,
      },
    });

    return () => {
      window.removeEventListener("resize", calculateCardPositions);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(container);
    };
  }, []);

  const handleCardClick = (index) => {
    setActiveIndex(index);
    gsap.to(scrollContainerRef.current, {
      x: -cardPositionsRef.current[index],
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="relative h-full flex items-center">
        <div
          ref={scrollContainerRef}
          className={`scroll-container flex items-center gap-5 ${
            activeIndex !== null ? "has-active" : ""
          }`}
          style={{ width: "max-content", willChange: "transform" }}
        >
          {serviceItems.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => handleCardClick(index)}
              className={`service-card ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="flex flex-col justify-between h-full">
                <div className="mb-4">{service.icon}</div>
                <h3 className="uppercase text-gray-900 text-lg font-semibold">
                  {service.title}
                </h3>
                <div className="card-content mt-4">
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    >
                      <source src="/sample-video.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .service-card {
          width: ${COLLAPSED_WIDTH}px;
          flex-shrink: 0;
          transition: width 1000ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease;
          background: #f8fafb;
          border-radius: 18px;
          padding: 24px;
          cursor: pointer;
          user-select: none;
        }
        .has-active .service-card:not(.active) {
          width: 180px;
          opacity: 0.75;
        }
        .service-card.active {
          width: ${EXPANDED_WIDTH}px !important;
          transform: translateY(-10px);
          background: #fff;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          z-index: 50;
        }
        .service-card .card-content {
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition: opacity 350ms ease, max-height 450ms ease;
        }
        .service-card.active .card-content {
          opacity: 1;
          max-height: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Services;
