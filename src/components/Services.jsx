import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [activeService, setActiveService] = useState(0);

  const serviceItems = [
    {
      icon: "🎨",
      category: "COLLECTING DATA",
      title: "Every model starts with data",
      description:
        "Data is collected from diverse sources for any language we work on, such as web data, collected speech data, and identified video transcripts.",
      steps: ["PREPARING DATA", "MODEL TRAINING"],
    },
    {
      icon: "💻",
      category: "WEB DEVELOPMENT",
      title: "Building responsive applications",
      description:
        "Creating modern, scalable web applications using cutting-edge technologies and best practices for optimal performance.",
      steps: ["DESIGN SYSTEM", "DEVELOPMENT", "TESTING"],
    },
    {
      icon: "📱",
      category: "MOBILE DEVELOPMENT",
      title: "Native mobile experiences",
      description:
        "Developing intuitive mobile applications for iOS and Android platforms with seamless user experiences.",
      steps: ["PROTOTYPING", "DEVELOPMENT", "DEPLOYMENT"],
    },
    {
      icon: "☁️",
      category: "CLOUD SOLUTIONS",
      title: "Scalable infrastructure",
      description:
        "Leveraging cloud technologies to build robust, scalable, and secure infrastructure solutions.",
      steps: ["ARCHITECTURE", "IMPLEMENTATION", "MONITORING"],
    },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    const sections = container.children;

    // Set up horizontal scroll
    const totalWidth = sections.length * window.innerWidth;

    gsap.set(container, { width: totalWidth });
    gsap.set(sections, { width: window.innerWidth });

    // Create horizontal scroll animation
    const scrollTween = gsap.to(container, {
      x: () => -(totalWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentSection = Math.floor(progress * sections.length);
          setActiveService(Math.min(currentSection, sections.length - 1));
        },
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      <div ref={scrollContainerRef} className="flex">
        {serviceItems.map((service, index) => (
          <div
            key={index}
            className="min-h-screen flex items-center justify-center px-8"
            style={{ width: "100vw" }}
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="text-6xl mb-4">{service.icon}</div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    {service.category}
                  </p>

                  <h2 className="text-4xl lg:text-5xl font-bold text-blue-600 leading-tight">
                    {service.title}
                  </h2>

                  <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Right Content - Process Steps */}
              <div className="space-y-8">
                {service.steps.map((step, stepIndex) => (
                  <div
                    key={stepIndex}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                      activeService === index
                        ? "bg-white shadow-lg transform scale-105"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">
                        {stepIndex + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{step}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-2">
          {serviceItems.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeService === index ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
