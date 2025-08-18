import { useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react';
import { PlayCircle, Star, Quote } from 'lucide-react';

const testimonialsData = [
  {
    type: 'text',
    quote: 'Tastes like a candy I used to enjoy as a kid, but it\'s a vitamin. It tastes amazing!',
    initials: 'PD',
    name: 'Priya D.',
    location: 'San Francisco, CA',
    rating: 5,
    bgColor: 'from-lime-400 to-lime-500',
    textColor: 'text-gray-800'
  },
  {
    type: 'video',
    name: 'Sierra S.',
    location: 'San Jose, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108375-2616b612b786?w=400&h=300&fit=crop&crop=face',
    bgColor: 'from-white to-gray-50'
  },
  {
    type: 'text',
    quote: 'Finally found a supplement that actually works and tastes great too!',
    initials: 'MK',
    name: 'Mike K.',
    location: 'Austin, TX',
    rating: 5,
    bgColor: 'from-blue-500 to-blue-600',
    textColor: 'text-white'
  },
  {
    type: 'video',
    name: 'Jessica L.',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face',
    bgColor: 'from-white to-gray-50'
  },
  {
    type: 'text',
    quote: 'Best decision I made for my health this year. Highly recommend!',
    initials: 'RH',
    name: 'Robert H.',
    location: 'Chicago, IL',
    rating: 5,
    bgColor: 'from-orange-500 to-orange-600',
    textColor: 'text-white'
  },
  {
    type: 'video',
    name: 'Amanda C.',
    location: 'Miami, FL',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop&crop=face',
    bgColor: 'from-white to-gray-50'
  },
  {
    type: 'text',
    quote: 'My kids love these vitamins and so do I. Perfect for the whole family!',
    initials: 'LW',
    name: 'Lisa W.',
    location: 'Seattle, WA',
    rating: 5,
    bgColor: 'from-pink-500 to-pink-600',
    textColor: 'text-white'
  },
  {
    type: 'video',
    name: 'David M.',
    location: 'Denver, CO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face',
    bgColor: 'from-white to-gray-50'
  }
];

// Enhanced Animation Engine dengan sequence control
class AnimationEngine {
  constructor() {
    this.animations = new Map();
    this.isInitialized = false;
    this.animationSequence = {
      textComplete: false,
      cardsStarted: false
    };
    this.globalSettings = {
      speed: 60,
      ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      pauseOnHover: true,
      staggerDelay: 100
    };
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.injectGlobalStyles();
  }

  injectGlobalStyles() {
    const styleId = 'testimonials-animations';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes textShimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes slideInFromRight {
          0% { 
            transform: translateX(100vw);
            opacity: 0;
          }
          100% { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromLeft {
          0% { 
            transform: translateX(-100vw);
            opacity: 0;
          }
          100% { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInScale {
          0% { 
            transform: translateY(50px) scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        .text-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: textShimmer 2s ease-in-out infinite;
        }
        
        .card-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 2s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Animate text dengan sequence
  animateTextSequence(elements, onComplete) {
    elements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(50px) scale(0.8)';
      element.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1)';
        
        // Call onComplete after last element
        if (index === elements.length - 1) {
          setTimeout(() => {
            this.animationSequence.textComplete = true;
            onComplete && onComplete();
          }, 1000);
        }
      }, index * 300);
    });
  }

  // Animate cards dengan direction berbeda
  animateCardsSequence(topRowElement, bottomRowElement) {
    if (!this.animationSequence.textComplete) return;
    
    this.animationSequence.cardsStarted = true;
    
    // Top row - slide from right
    if (topRowElement) {
      topRowElement.style.opacity = '0';
      topRowElement.style.animation = 'slideInFromRight 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
      
      setTimeout(() => {
        topRowElement.style.opacity = '1';
        // Start infinite scroll after slide-in
        this.createInfiniteScroll(topRowElement, {
          speed: 80,
          direction: 'normal'
        });
      }, 1500);
    }
    
    // Bottom row - slide from left dengan delay
    if (bottomRowElement) {
      setTimeout(() => {
        bottomRowElement.style.opacity = '0';
        bottomRowElement.style.animation = 'slideInFromLeft 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        
        setTimeout(() => {
          bottomRowElement.style.opacity = '1';
          // Start infinite scroll after slide-in
          this.createInfiniteScroll(bottomRowElement, {
            speed: 70,
            direction: 'reverse'
          });
        }, 1500);
      }, 500);
    }
  }

  createInfiniteScroll(element, options = {}) {
    const config = { ...this.globalSettings, ...options };
    const container = element;
    const items = Array.from(container.children);
    
    if (items.length === 0) return null;

    // Create seamless loop by duplicating items
    const duplicates = items.map(item => item.cloneNode(true));
    duplicates.forEach(duplicate => container.appendChild(duplicate));

    // Calculate total width
    let totalWidth = 0;
    items.forEach(item => {
      totalWidth += item.offsetWidth + parseInt(getComputedStyle(item).marginLeft) + parseInt(getComputedStyle(item).marginRight);
    });

    // Set up CSS animation
    const keyframes = `
      @keyframes infiniteScroll${config.direction === 'reverse' ? 'Reverse' : ''} {
        0% { transform: translateX(${config.direction === 'reverse' ? '-' + totalWidth + 'px' : '0'}); }
        100% { transform: translateX(${config.direction === 'reverse' ? '0' : '-' + totalWidth + 'px'}); }
      }
    `;

    // Inject keyframes if not already present
    const styleId = `animation-${config.direction || 'normal'}`;
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = keyframes;
      document.head.appendChild(style);
    }

    // Apply animation
    const duration = totalWidth / config.speed;
    container.style.animation = `infiniteScroll${config.direction === 'reverse' ? 'Reverse' : ''} ${duration}s linear infinite`;
    container.style.display = 'flex';
    container.style.width = `${totalWidth * 2}px`;

    return {
      pause: () => container.style.animationPlayState = 'paused',
      resume: () => container.style.animationPlayState = 'running',
      destroy: () => {
        container.style.animation = '';
        duplicates.forEach(duplicate => duplicate.remove());
      }
    };
  }

  registerAnimation(id, animationInstance) {
    this.animations.set(id, animationInstance);
  }

  pauseAll() {
    this.animations.forEach(animation => animation.pause && animation.pause());
  }

  resumeAll() {
    this.animations.forEach(animation => animation.resume && animation.resume());
  }

  destroy() {
    this.animations.forEach(animation => animation.destroy && animation.destroy());
    this.animations.clear();
    this.isInitialized = false;
  }
}

const Card = ({ data, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  
  const { type, quote, initials, name, location, bgColor, textColor, rating, avatar } = data;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHover(true);
    
    if (cardRef.current) {
      cardRef.current.style.transform = 'scale(1.05) translateZ(0)';
      cardRef.current.style.zIndex = '50';
      cardRef.current.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    }

    // Auto-play video on hover untuk video cards
    if (type === 'video' && videoRef.current && isVideoLoaded) {
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(error => {
        console.log('Video play failed:', error);
      });
    }
  }, [onHover, type, isVideoLoaded]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    onHover(false);
    
    if (cardRef.current) {
      cardRef.current.style.transform = 'scale(1) translateZ(0)';
      cardRef.current.style.zIndex = '10';
      cardRef.current.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }

    // Pause video when not hovering
    if (type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  }, [onHover, type]);

  const handleVideoClick = useCallback(() => {
    if (type === 'video') {
      // Navigate to video detail page
      const videoDetailUrl = `/video-testimonial/${name.toLowerCase().replace(/\s+/g, '-')}`;
      console.log(`Navigating to: ${videoDetailUrl}`);
      // Simulasi redirect
      window.open(`https://example.com${videoDetailUrl}`, '_blank');
    }
  }, [type, name]);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  if (type === 'video') {
    // Sample video untuk demonstrasi
    const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    return (
      <div 
        ref={cardRef}
        className="testimonial-card w-60 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden flex-shrink-0 mx-4 shadow-xl cursor-pointer transition-all duration-500 ease-out group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleVideoClick}
        style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
      >
        <div className={`relative w-full h-full bg-gradient-to-br ${bgColor} overflow-hidden`}>
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
            style={{ 
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              opacity: isVideoLoaded ? (isVideoPlaying ? 1 : 0.8) : 0
            }}
            muted
            loop
            preload="metadata"
            onLoadedData={handleVideoLoad}
            poster={avatar}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Fallback image */}
          <img 
            src={avatar} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ 
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              opacity: isVideoLoaded && isVideoPlaying ? 0 : 1,
              zIndex: isVideoLoaded && isVideoPlaying ? 1 : 2
            }} 
          />
          
          {/* Enhanced gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Play button dengan enhanced animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`relative bg-white/95 backdrop-blur-sm rounded-full p-6 transition-all duration-500 ${
              isHovered ? 'scale-110 bg-white shadow-2xl' : 'scale-100'
            } ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}>
              <PlayCircle size={60} className={`text-gray-800 transition-all duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`} />
              
              {/* Pulse animation ring */}
              <div className={`absolute inset-0 rounded-full bg-white/30 transition-all duration-1000 ${
                isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
              }`}></div>
            </div>
          </div>
          
          {/* Enhanced bottom section dengan animated background */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            {/* Animated background untuk text */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isHovered ? 'card-shimmer' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-pink-600/20"></div>
            </div>
            
            <div className="relative z-10 flex items-center">
              <div className="relative">
                <img src={avatar} alt={name} className="w-14 h-14 rounded-full border-2 border-white/40 object-cover" />
                {/* Live indicator */}
                {isVideoPlaying && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                )}
              </div>
              <div className="ml-4 text-white relative">
                <p className={`font-bold text-lg relative ${isHovered ? 'text-shimmer' : ''}`}>
                  {name}
                </p>
                <p className={`text-sm opacity-90 relative ${isHovered ? 'text-shimmer' : ''}`}>
                  {location}
                </p>
              </div>
            </div>

            {/* Video progress indicator */}
            {isVideoPlaying && (
              <div className="mt-3 w-full bg-white/20 rounded-full h-1 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{
                    animation: 'progress 10s linear infinite',
                    width: '0%'
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Loading spinner */}
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
      className="testimonial-card w-60 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden flex-shrink-0 mx-4 shadow-xl cursor-pointer transition-all duration-500 ease-out group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
    >
      <div className={`w-full h-full p-8 flex flex-col justify-between bg-gradient-to-br ${bgColor} transition-all duration-500 relative overflow-hidden`}>
        {/* Background shimmer effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isHovered ? 'card-shimmer' : ''}`}></div>
        
        <div className="relative z-10">
          <Quote size={32} className={`mb-4 transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${textColor === "text-gray-800" ? "text-gray-600" : "text-white/70"}`} />
          
          <div className="flex mb-6">
            {[...Array(rating)].map((_, i) => (
              <Star 
                key={i} 
                size={20} 
                className={`mr-1 drop-shadow-sm transition-all duration-300 ${
                  isHovered ? 'scale-110' : 'scale-100'
                } ${textColor === "text-gray-800" ? "text-yellow-500" : "text-yellow-300"} fill-current`}
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
          
          <p className={`${textColor} text-lg font-medium leading-relaxed transition-all duration-300 relative ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${isHovered ? 'text-shimmer' : ''}`}>
            "{quote}"
          </p>
          
          <div className="flex items-center mt-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${textColor === "text-gray-800" ? "bg-gray-800 border-gray-700" : "bg-white/30 border-white/30"} border-2`}>
              <span className="text-white font-bold text-xl">{initials}</span>
            </div>
            <div className="ml-4 relative">
              <p className={`${textColor} font-bold text-lg relative ${isHovered ? 'text-shimmer' : ''}`}>
                {name}
              </p>
              <p className={`text-sm relative ${textColor === "text-gray-800" ? "text-gray-600" : "text-white/80"} ${isHovered ? 'text-shimmer' : ''}`}>
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
  const [isGloballyPaused, setIsGloballyPaused] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  
  const mid = Math.ceil(testimonialsData.length / 2);
  const topRowData = [...testimonialsData.slice(0, mid), ...testimonialsData.slice(0, mid)];
  const bottomRowData = [...testimonialsData.slice(mid), ...testimonialsData.slice(mid)];

  const handleCardHover = useCallback((isPaused) => {
    if (engineRef.current) {
      if (isPaused && !isGloballyPaused) {
        engineRef.current.pauseAll();
        setIsGloballyPaused(true);
      } else if (!isPaused && isGloballyPaused) {
        setTimeout(() => {
          engineRef.current.resumeAll();
          setIsGloballyPaused(false);
        }, 100);
      }
    }
  }, [isGloballyPaused]);

  // Intersection Observer untuk detect viewport
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

    // Step 1: Animate text elements first
    const titleElements = document.querySelectorAll('.title-text');
    engineRef.current.animateTextSequence(Array.from(titleElements), () => {
      // Step 2: After text animation complete, animate cards
      setTimeout(() => {
        engineRef.current.animateCardsSequence(topRowRef.current, bottomRowRef.current);
      }, 500);
    });
  };

  useLayoutEffect(() => {
    engineRef.current = new AnimationEngine();
    engineRef.current.init();

    // Hide cards initially
    if (topRowRef.current) {
      topRowRef.current.style.opacity = '0';
    }
    if (bottomRowRef.current) {
      bottomRowRef.current.style.opacity = '0';
    }

    return () => {
      engineRef.current?.destroy();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      {/* Enhanced background dengan subtle animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Enhanced title dengan staggered animation */}
      <div className="absolute z-10 text-center pointer-events-none select-none">
        <h1 className="title-text text-[4rem] md:text-[6rem] font-extrabold text-gray-300 tracking-wider">WELLNESS</h1>
        <h1 className="title-text text-[6rem] md:text-[9rem] font-black text-gray-800 tracking-tighter bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">STORIES</h1>
        <h1 className="title-text text-[4rem] md:text-[6rem] font-extrabold text-gray-300 tracking-wider">SHARED</h1>
      </div>

      {/* Enhanced carousel dengan optimized performance */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center space-y-8 py-8">
        <div ref={topRowRef} className="w-full flex items-center top-row overflow-hidden" style={{ willChange: 'transform' }}>
          {topRowData.map((card, index) => (
            <Card key={`top-${index}`} data={card} onHover={handleCardHover} />
          ))}
        </div>
        <div ref={bottomRowRef} className="w-full flex items-center bottom-row overflow-hidden" style={{ willChange: 'transform' }}>
          {bottomRowData.map((card, index) => (
            <Card key={`bottom-${index}`} data={card} onHover={handleCardHover} />
          ))}
        </div>
      </div>

      {/* Enhanced loading indicator */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-400 opacity-50">
        Enhanced sequence animations with viewport detection
      </div>
    </section>
  );
};

export default Testimonials;