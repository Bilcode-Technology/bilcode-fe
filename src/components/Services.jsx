import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChartPie,
  Component,
  GraduationCap,
  Monitor,
  Smartphone,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);

  const serviceItems = [
    {
      icon: <Monitor size={32} />,
      title: "Web Development",
      description:
        "Gathering comprehensive datasets from multiple sources to ensure robust model foundation and diverse training materials.",
    },
    {
      icon: <Smartphone size={32} />,
      title: "Mobile Development",
      description:
        "Cleaning, processing, and structuring raw data to optimize quality and ensure compatibility with machine learning algorithms.",
    },
    {
      icon: <Component size={32} />,
      title: "UI UX Design",
      description:
        "Training sophisticated AI models using prepared datasets with advanced algorithms and computational resources.",
    },
    {
      icon: <ChartPie size={32} />,
      title: "data analyst",
      description:
        "Rigorous testing and validation of trained models to ensure accuracy, reliability, and performance standards.",
    },
    {
      icon: <GraduationCap size={32} />,
      title: "IT Academy",
      description:
        "Rigorous testing and validation of trained models to ensure accuracy, reliability, and performance standards.",
    },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    const cards = cardsRef.current;

    // Calculate total width for horizontal scroll
    const cardWidth = 200; // Width of each card
    const gap = 20; // Gap between cards
    const totalWidth = (cardWidth + gap) * serviceItems.length;

    // Set up horizontal scroll container
    gsap.set(container, {
      width: totalWidth,
      display: "flex",
      gap: `${gap}px`,
      x: -(totalWidth - window.innerWidth + 100),
    });

    // Set initial card states
    gsap.set(cards, {
      opacity: 0.6,
      scale: 0.9,
      width: cardWidth,
    });

    // Create horizontal scroll animation
    const scrollTween = gsap.to(container, {
      x: () => totalWidth - window.innerWidth + 100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Individual card animations
    cards.forEach((card, index) => {
      // Active state when card is in center
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const cardProgress = progress * serviceItems.length;
          const cardIndex = Math.floor(cardProgress);
          const cardOffset = cardProgress - cardIndex;

          if (index === cardIndex) {
            // Active card
            const scale = 0.9 + (1 - Math.abs(cardOffset - 0.5) * 2) * 0.2;
            const opacity = 0.6 + (1 - Math.abs(cardOffset - 0.5) * 2) * 0.4;

            gsap.set(card, {
              scale: scale,
              opacity: opacity,
            });

            if (Math.abs(cardOffset - 0.5) < 0.3) {
              card.classList.add("active");
            } else {
              card.classList.remove("active");
            }
          } else if (index === cardIndex + 1 && cardOffset > 0.5) {
            // Next card coming into view
            const nextProgress = (cardOffset - 0.5) * 2;
            const scale = 0.9 + nextProgress * 0.1;
            const opacity = 0.6 + nextProgress * 0.2;

            gsap.set(card, {
              scale: scale,
              opacity: opacity,
            });
            card.classList.remove("active");
          } else {
            // Inactive cards
            gsap.set(card, {
              scale: 0.9,
              opacity: 0.6,
            });
            card.classList.remove("active");
          }
        },
      });
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);

  const serviceItems = [
    {
      icon: <Monitor size={40} />,
      title: "Collecting Data",
      description:
        "Data is collected from diverse sources for any language we work on, such as web data, collected speech data, and identified video transcripts.",
    },
    {
      icon: <Smartphone size={40} />,
      title: "Preparing Data",
      description:
        "Once enough data has been collected for a specific language, we process and validate the data for optimal performance.",
    },
    {
      icon: <Component size={40} />,
      title: "Model Training",
      description:
        "Data patterns are identified by machine learning models in training. They can then spot them in unseen data or generate novel data.",
    },
    {
      icon: <ChartPie size={40} />,
      title: "Model Testing",
      description:
        "We rigorously test and validate trained models to ensure accuracy, reliability, and performance standards.",
    },
    {
      icon: <GraduationCap size={40} />,
      title: "Product Rollout",
      description:
        "Once it’s ready, the model is launched on products like Gboard, YouTube, or updated in services like Gemini and Translate.",
    },
  ];

  // useEffect(() => {
  //   const container = scrollContainerRef.current;
  //   const cards = cardsRef.current;

  //   const baseWidth = 240;
  //   const expandedWidth = 420;
  //   const gap = 40;

  //   // Styling awal
  //   gsap.set(container, {
  //     display: "flex",
  //     gap: `${gap}px`,
  //     padding: `0px`,
  //   });

  //   gsap.set(cards, {
  //     opacity: 0.4,
  //     scale: 0.9,
  //     width: baseWidth,
  //     flexShrink: 0,
  //   });

  //   // Scroll horizontal
  //   gsap.to(container, {
  //     x: () => {
  //       // Total lebar semua card
  //       const totalWidth = (baseWidth + gap) * cards.length;

  //       // Posisi yang diperlukan agar card terakhir ada di tengah layar
  //       const scrollDistance =
  //         totalWidth - window.innerWidth / 2 - baseWidth / 2;

  //       return -scrollDistance;
  //     },
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: containerRef.current,
  //       start: "top top",
  //       end: () => {
  //         // Scroll panjang = total lebar - setengah layar + setengah lebar card
  //         const totalWidth = (baseWidth + gap) * cards.length;
  //         return totalWidth;
  //       },
  //       scrub: 1,
  //       pin: true,
  //     },
  //   });

  //   // Animasi aktif saat di tengah viewport
  //   ScrollTrigger.create({
  //     trigger: containerRef.current,
  //     start: "top top",
  //     end: `+=${(baseWidth + gap) * cards.length}`,
  //     scrub: 1,
  //     onUpdate: () => {
  //       const centerX = window.innerWidth / 2;

  //       cards.forEach((card, i) => {
  //         const rect = card.getBoundingClientRect();
  //         const cardCenter = rect.left + rect.width / 2;
  //         const distance = Math.abs(centerX - cardCenter);

  //         const isActive = distance < 100;

  //         gsap.to(card, {
  //           width: isActive ? expandedWidth : baseWidth,
  //           scale: isActive ? 1 : 0.9,
  //           opacity: isActive ? 1 : 0.4,
  //           duration: 0.4,
  //           ease: "power2.out",
  //         });

  //         if (isActive) {
  //           card.classList.add("active");
  //         } else {
  //           card.classList.remove("active");
  //         }
  //       });
  //     },
  //   });

  //   return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  // }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      {/* Header */}
      {/* <div className="text-center py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Process
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
          From data collection to product rollout, we follow a systematic
          approach to deliver exceptional AI solutions.
        </p>
      </div> */}

      {/* Horizontal Scroll Container */}
      <div className="relative h-screen flex items-center  justify-center">
        <div ref={scrollContainerRef} className="flex items-center">
          {serviceItems.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="service-card bg-gray-50 rounded-2xl p-8 flex-shrink-0 transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col justify-between h-full">
                {/* Icon */}
                <div className="mb-4">{service.icon}</div>

                {/* Title */}
                <h3 className="uppercase text-gray-900 text-lg font-semibold">
                  {service.title}
                </h3>

                {/* Description & Video — hanya muncul saat aktif */}
                <div className="card-content mt-4 opacity-0 max-h-0 transition-all duration-500">
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    {/* Contoh video dummy */}
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
          transition: all 0.4s ease-in-out;
          width: 200px;
          flex-shrink: 0;
        }

        .service-card.active {
          width: 600px !important;
          margin: 0 20px;
          background-color: white;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transform: translateY(-10px);
        }

        .service-card.active .card-content {
          opacity: 1 !important;
          max-height: 1000px !important;
        }
      `}</style>
    </section>
  );
};

export default Services;
