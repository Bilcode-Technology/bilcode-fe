import {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { PlayCircle, Star, Quote } from "lucide-react";

const testimonialsData = [
  {
    type: "text",
    quote:
      "Tastes like a candy I used to enjoy as a kid, but it's a vitamin. It tastes amazing!",
    initials: "PD",
    name: "Priya D.",
    location: "San Francisco, CA",
    rating: 5,
    bgColor: "from-emerald-400 to-emerald-500",
    textColor: "text-white",
  },
  {
    type: "video",
    name: "Sierra S.",
    location: "San Jose, CA",
    avatar:
      "https://images.unsplash.com/photo-1494790108375-2616b612b786?w=400&h=300&fit=crop&crop=face",
    bgColor: "from-white to-gray-50",
  },
  {
    type: "text",
    quote:
      "Finally found a supplement that actually works and tastes great too!",
    initials: "MK",
    name: "Mike K.",
    location: "Austin, TX",
    rating: 5,
    bgColor: "from-blue-500 to-indigo-600",
    textColor: "text-white",
  },
  {
    type: "video",
    name: "Jessica L.",
    location: "New York, NY",
    avatar:
      "https://images.unsplash.com/photo-1494790108375-2616b612b786?w=400&h=300&fit=crop&crop=face",
    bgColor: "from-white to-gray-50",
  },
  {
    type: "text",
    quote: "Best decision I made for my health this year. Highly recommend!",
    initials: "RH",
    name: "Robert H.",
    location: "Chicago, IL",
    rating: 5,
    bgColor: "from-orange-500 to-red-500",
    textColor: "text-white",
  },
  {
    type: "video",
    name: "Amanda C.",
    location: "Miami, FL",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop&crop=face",
    bgColor: "from-white to-gray-50",
  },
  {
    type: "text",
    quote:
      "My kids love these vitamins and so do I. Perfect for the whole family!",
    initials: "LW",
    name: "Lisa W.",
    location: "Seattle, WA",
    rating: 5,
    bgColor: "from-pink-500 to-rose-500",
    textColor: "text-white",
  },
  {
    type: "video",
    name: "David M.",
    location: "Denver, CO",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
    bgColor: "from-white to-gray-50",
  },
];

class AnimationEngine {
  constructor() {
    this.animations = new Map();
    this.isInitialized = false;
    this.animationSequence = {
      textComplete: false,
      cardsStarted: false,
    };
    this.isPaused = false;
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.injectGlobalStyles();
  }

  injectGlobalStyles() {
    const styleId = "testimonials-animations";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes slideInFromRight {
          0% { 
            transform: translateX(100vw) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100vw) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes cardPopIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .card-pop-in {
          animation: cardPopIn 0.5s ease-out forwards;
        }

        @keyframes cardPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.005); /* Very subtle scale up */
          }
        }

        .card-pulse {
          animation: cardPulse 4s ease-in-out infinite; /* Slow, subtle pulse */
        }
      `;
      document.head.appendChild(style);
    }
  }

  animateTextSequence(elements, onComplete) {
    elements.forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(60px) scale(0.9)";
      element.style.transition =
        "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0) scale(1)";

        if (index === elements.length - 1) {
          setTimeout(() => {
            this.animationSequence.textComplete = true;
            onComplete && onComplete();
          }, 1200);
        }
      }, index * 400);
    });
  }

  animateCardsSequence(topRowElement, bottomRowElement) {
    if (!this.animationSequence.textComplete) return;

    this.animationSequence.cardsStarted = true;

    if (topRowElement) {
      topRowElement.style.opacity = "0";
      topRowElement.style.animation =
        "slideInFromRight 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";

      setTimeout(() => {
        topRowElement.style.opacity = "1";
        const topScrollAnimation = this.createInfiniteScroll(topRowElement, {
          speed: 60,
          direction: "normal",
        });
        this.registerAnimation("topRow", topScrollAnimation);
      }, 2000);
    }

    if (bottomRowElement) {
      setTimeout(() => {
        bottomRowElement.style.opacity = "0";
        bottomRowElement.style.animation =
          "slideInFromLeft 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";

        setTimeout(() => {
          bottomRowElement.style.opacity = "1";
          const bottomScrollAnimation = this.createInfiniteScroll(
            bottomRowElement,
            {
              speed: 55,
              direction: "reverse",
            }
          );
          this.registerAnimation("bottomRow", bottomScrollAnimation);
        }, 2000);
      }, 700);
    }
  }

  createInfiniteScroll(element, options = {}) {
    const container = element;
    const items = Array.from(container.children);

    if (items.length === 0) return null;

    const duplicates = items.map((item) => item.cloneNode(true));
    duplicates.forEach((duplicate) => container.appendChild(duplicate));

    let totalWidth = 0;
    items.forEach((item) => {
      totalWidth +=
        item.offsetWidth +
        parseInt(getComputedStyle(item).marginLeft) +
        parseInt(getComputedStyle(item).marginRight);
    });

    const keyframes = `
      @keyframes infiniteScroll${
        options.direction === "reverse" ? "Reverse" : ""
      } {
        0% { transform: translateX(${
          options.direction === "reverse" ? "-" + totalWidth + "px" : "0"
        }); }
        100% { transform: translateX(${
          options.direction === "reverse" ? "0" : "-" + totalWidth + "px"
        }); }
      }
    `;

    const styleId = `animation-${options.direction || "normal"}`;
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = keyframes;
      document.head.appendChild(style);
    }

    const duration = totalWidth / options.speed;
    container.style.animation = `infiniteScroll${
      options.direction === "reverse" ? "Reverse" : ""
    } ${duration}s linear infinite`;
    container.style.display = "flex";
    container.style.width = `${totalWidth * 2}px`;

    return {
      pause: () => {
        container.style.animationPlayState = "paused";
      },
      resume: () => {
        container.style.animationPlayState = "running";
      },
      destroy: () => {
        container.style.animation = "";
        duplicates.forEach((duplicate) => duplicate.remove());
      },
    };
  }

  registerAnimation(id, animationInstance) {
    this.animations.set(id, animationInstance);
  }

  pauseAll() {
    this.isPaused = true;
    this.animations.forEach((animation) => {
      if (animation && animation.pause) {
        animation.pause();
      }
    });
  }

  resumeAll() {
    this.isPaused = false;
    this.animations.forEach((animation) => {
      if (animation && animation.resume) {
        animation.resume();
      }
    });
  }

  destroy() {
    this.animations.forEach(
      (animation) => animation.destroy && animation.destroy()
    );
    this.animations.clear();
    this.isInitialized = false;
    this.isPaused = false;
  }
}

const Card = ({ data, onVideoHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  const {
    type,
    quote,
    initials,
    name,
    location,
    bgColor,
    textColor,
    rating,
    avatar,
  } = data;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);

    // Only trigger pause for video cards
    if (type === "video" && onVideoHover) {
      onVideoHover(true);
    }

    if (cardRef.current) {
      cardRef.current.style.transform =
        "scale(1.05) translateZ(0) rotateY(5deg)";
      cardRef.current.style.zIndex = "50";
      cardRef.current.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
    }

    if (type === "video" && videoRef.current && isVideoLoaded) {
      videoRef.current
        .play()
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch((error) => {
          console.log("Video play failed:", error);
        });
    }
  }, [onVideoHover, type, isVideoLoaded]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);

    // Only trigger resume for video cards
    if (type === "video" && onVideoHover) {
      onVideoHover(false);
    }

    if (cardRef.current) {
      cardRef.current.style.transform = "scale(1) translateZ(0) rotateY(0deg)";
      cardRef.current.style.zIndex = "10";
      cardRef.current.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
    }

    if (type === "video" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  }, [onVideoHover, type]);

  const handleVideoClick = useCallback(() => {
    if (type === "video") {
      const videoDetailUrl = `/video-testimonial/${name
        .toLowerCase()
        .replace(/\s+/g, "-")}`;
      console.log(`Navigating to: ${videoDetailUrl}`);
      window.open(`https://example.com${videoDetailUrl}`, "_blank");
    }
  }, [type, name]);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  if (type === "video") {
    const videoUrl =
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    return (
      <div
        ref={cardRef}
        className="testimonial-card w-60 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden flex-shrink-0 mx-4 shadow-xl cursor-pointer transition-all duration-700 ease-out group border border-gray-200/50 backdrop-blur-sm"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleVideoClick}
        style={{
          backfaceVisibility: "hidden",
          willChange: "transform",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
        }}
      >
        <div
          className={`relative w-full h-full bg-gradient-to-br ${bgColor} overflow-hidden`}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              opacity: isVideoLoaded ? (isVideoPlaying ? 1 : 0.85) : 0,
            }}
            muted
            loop
            preload="metadata"
            onLoadedData={handleVideoLoad}
            poster={avatar}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>

          <img
            src={avatar}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              opacity: isVideoLoaded && isVideoPlaying ? 0 : 1,
              zIndex: isVideoLoaded && isVideoPlaying ? 1 : 2,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`relative bg-white/95 backdrop-blur-sm rounded-full p-6 transition-all duration-500 shadow-lg ${
                isHovered ? "scale-110 bg-white" : "scale-100"
              } ${isVideoPlaying ? "opacity-0" : "opacity-100"}`}
            >
              <PlayCircle
                size={60}
                className={`text-gray-800 transition-all duration-300 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="relative z-10 flex items-center">
              <div className="relative">
                <img
                  src={avatar}
                  alt={name}
                  className="w-14 h-14 rounded-full border-2 border-white/40 object-cover"
                />
                {isVideoPlaying && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                )}
              </div>
              <div className="ml-4 text-white relative">
                <p className="font-bold text-lg">{name}</p>
                <p className="text-sm opacity-90">{location}</p>
              </div>
            </div>

            {isVideoPlaying && (
              <div className="mt-3 w-full bg-white/20 rounded-full h-1 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{
                    animation: "progress 10s linear infinite",
                    width: "0%",
                  }}
                ></div>
              </div>
            )}
          </div>

          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="testimonial-card w-60 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden flex-shrink-0 mx-4 shadow-xl cursor-pointer transition-all duration-700 ease-out group border border-gray-200/30 backdrop-blur-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backfaceVisibility: "hidden",
        willChange: "transform",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
      }}
    >
      <div
        className={`w-full h-full p-8 flex flex-col justify-between bg-gradient-to-br ${bgColor} transition-all duration-500 relative overflow-hidden`}
      >
        <div className="relative z-10">
          <Quote
            size={32}
            className={`mb-4 transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            } ${
              textColor === "text-gray-800" ? "text-gray-600" : "text-white/70"
            }`}
          />

          <div className="flex mb-6">
            {[...Array(rating)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={`mr-1 drop-shadow-sm transition-all duration-300 ${
                  isHovered ? "scale-110" : "scale-100"
                } ${
                  textColor === "text-gray-800"
                    ? "text-yellow-500"
                    : "text-yellow-300"
                } fill-current`}
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div>

          <p
            className={`${textColor} text-lg font-medium leading-relaxed transition-all duration-300 relative ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          >
            "{quote}"
          </p>

          <div className="flex items-center mt-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                isHovered ? "scale-110" : "scale-100"
              } ${
                textColor === "text-gray-800"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white/30 border-white/30"
              } border-2`}
            >
              <span className="text-white font-bold text-xl">{initials}</span>
            </div>
            <div className="ml-4 relative">
              <p className={`${textColor} font-bold text-lg`}>{name}</p>
              <p
                className={`text-sm ${
                  textColor === "text-gray-800"
                    ? "text-gray-600"
                    : "text-white/80"
                }`}
              >
                {location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const engineRef = useRef(null);
  const sectionRef = useRef(null);
  const [hoveredVideoCount, setHoveredVideoCount] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);

  const mid = Math.ceil(testimonialsData.length / 2);
  const topRowData = [
    ...testimonialsData.slice(0, mid),
    ...testimonialsData.slice(0, mid),
  ];
  const bottomRowData = [
    ...testimonialsData.slice(mid),
    ...testimonialsData.slice(mid),
  ];

  const handleVideoHover = useCallback((isHovering) => {
    setHoveredVideoCount((prevCount) => {
      const newCount = isHovering ? prevCount + 1 : Math.max(prevCount - 1, 0);
      return newCount;
    });
  }, []);

  // Effect to handle pause/resume based on video hover count
  useEffect(() => {
    if (!engineRef.current) return;

    if (hoveredVideoCount > 0) {
      engineRef.current.pauseAll();
    } else {
      engineRef.current.resumeAll();
    }
  }, [hoveredVideoCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInViewport) {
            setIsInViewport(true);
            startAnimationSequence();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isInViewport]);

  const startAnimationSequence = () => {
    if (!engineRef.current) return;

    const titleElements = document.querySelectorAll(".title-text");
    engineRef.current.animateTextSequence(Array.from(titleElements), () => {
      setTimeout(() => {
        engineRef.current.animateCardsSequence(
          topRowRef.current,
          bottomRowRef.current
        );
      }, 600);
    });
  };

  useLayoutEffect(() => {
    engineRef.current = new AnimationEngine();
    engineRef.current.init();

    if (topRowRef.current) {
      topRowRef.current.style.opacity = "0";
    }
    if (bottomRowRef.current) {
      bottomRowRef.current.style.opacity = "0";
    }

    return () => {
      engineRef.current?.destroy();
    };
  }, []);

  return (
    <section className=" overflow-hidden">
      <div
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center bg-white my-[80px]"
      >
        {/* Enhanced title section */}
        <div className="absolute z-10 text-center pointer-events-none select-none">
          {/* <h1 className="title-text text-[4rem] md:text-[6rem] font-bold text-gray-200 tracking-wider">
            WELLNESS
          </h1>
          <h1 className="title-text text-[6rem] md:text-[10rem] font-black text-gray-800 tracking-tighter bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-sm">
            STORIES
          </h1>
          <h1 className="title-text text-[4rem] md:text-[6rem] font-bold text-gray-200 tracking-wider">
            SHARED
          </h1> */}
        </div>

        {/* Card carousel */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center space-y-12 py-8">
          <div
            ref={topRowRef}
            className="w-full flex items-center top-row"
            style={{ willChange: "transform" }}
          >
            {topRowData.map((card, index) => (
              <Card
                key={`top-${index}`}
                data={card}
                onVideoHover={handleVideoHover}
              />
            ))}
          </div>
          <div
            ref={bottomRowRef}
            className="w-full flex items-center bottom-row"
            style={{ willChange: "transform" }}
          >
            {bottomRowData.map((card, index) => (
              <Card
                key={`bottom-${index}`}
                data={card}
                onVideoHover={handleVideoHover}
              />
            ))}
          </div>
        </div>

        {/* Debug info (optional - you can remove this) */}
        {/* <div className="absolute bottom-4 right-4 z-30 bg-black/20 text-white p-2 rounded text-sm pointer-events-none">
        Video Cards Hovered: {hoveredVideoCount}
      </div> */}
      </div>
    </section>
  );
};

export default Testimonials;
