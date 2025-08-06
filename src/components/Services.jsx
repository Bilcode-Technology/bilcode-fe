import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);

  const serviceItems = [
    {
      icon: "📊",
      title: "Collecting Data",
      description:
        "Gathering comprehensive datasets from multiple sources to ensure robust model foundation and diverse training materials.",
    },
    {
      icon: "🔧",
      title: "Preparing Data",
      description:
        "Cleaning, processing, and structuring raw data to optimize quality and ensure compatibility with machine learning algorithms.",
    },
    {
      icon: "🤖",
      title: "Model Training",
      description:
        "Training sophisticated AI models using prepared datasets with advanced algorithms and computational resources.",
    },
    {
      icon: "🧪",
      title: "Model Testing",
      description:
        "Rigorous testing and validation of trained models to ensure accuracy, reliability, and performance standards.",
    },
    {
      icon: "🚀",
      title: "Product Rollout",
      description:
        "Deploying tested models into production environments with monitoring and continuous improvement processes.",
    },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    const cards = cardsRef.current;

    // Calculate total width for horizontal scroll
    const cardWidth = 400; // Width of each card
    const gap = 32; // Gap between cards
    const totalWidth = (cardWidth + gap) * serviceItems.length;

    // Set up horizontal scroll container
    gsap.set(container, {
      width: totalWidth,
      display: "flex",
      gap: `${gap}px`,
    });

    // Set initial card states
    gsap.set(cards, {
      opacity: 0.6,
      scale: 0.9,
      width: cardWidth,
    });

    // Create horizontal scroll animation
    const scrollTween = gsap.to(container, {
      x: () => -(totalWidth - window.innerWidth + 100),
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
      <div className="relative h-screen flex items-center">
        <div ref={scrollContainerRef} className="flex items-center pl-8">
          {serviceItems.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="service-card bg-gray-50 rounded-2xl p-8 flex-shrink-0 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center h-full">
                {/* Icon */}
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-sm mb-6">
                  {service.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>

                {/* Step Number */}
                <div className="mt-6">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .service-card {
          width: 400px;
          height: 500px;
        }

        .service-card.active {
          background-color: white;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transform: translateY(-10px);
        }
      `}</style>
    </section>
  );
};

export default Services;
