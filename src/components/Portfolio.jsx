import PortfolioCard from './PortfolioCard';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gambar from '../assets/gambar.jpeg';


const Portfolio = () => {
  const projects = [
    {
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
      partnerLabel: 'WE PARTNERED WITH',
      title: 'MARIAH CAREY TO CREATE',
      subtitle: 'CONTENT WITH KAY JEWELERS',
      tag: '#jewelry',
      color: '#FFD700',
      gradient: 'from-yellow-400 via-yellow-500 to-amber-600'
    },
    {
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
      partnerLabel: 'WE PARTNERED WITH',
      title: 'GLOBAL COFFEE CAMPAIGN',
      subtitle: 'WITH PREMIUM ROASTS',
      tag: '#beverage',
      color: '#8B4513',
      gradient: 'from-amber-700 via-orange-800 to-brown-900'
    },
    {
      image: 'https://images.unsplash.com/photo-1520975922284-7b6830f25a1b?q=80&w=1200&auto=format&fit=crop',
      partnerLabel: 'WE PARTNERED WITH',
      title: 'WINTER APPAREL LAUNCH',
      subtitle: 'FOR OUTDOOR BRAND',
      tag: '#fashion',
      color: '#4A90E2',
      gradient: 'from-blue-400 via-blue-500 to-indigo-600'
    },
    {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      partnerLabel: 'WE PARTNERED WITH',
      title: 'FINTECH PRODUCT INTRO',
      subtitle: 'FOR STARTUP SERIES A',
      tag: '#fintech',
      color: '#50C878',
      gradient: 'from-green-400 via-emerald-500 to-teal-600'
    },
    {
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1200&auto=format&fit=crop',
      partnerLabel: 'WE PARTNERED WITH',
      title: 'HEALTH APP REBRAND',
      subtitle: 'WITH CUSTOMER STORIES',
      tag: '#healthtech',
      color: '#FF6B6B',
      gradient: 'from-red-400 via-pink-500 to-rose-600'
    },
    {
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
      partnerLabel: 'WE PARTNERED WITH',
      title: 'SMART HOME CAMPAIGN',
      subtitle: 'WITH IOT PARTNERS',
      tag: '#iot',
      color: '#9B59B6',
      gradient: 'from-purple-400 via-violet-500 to-indigo-600'
    },
  ];

  const sectionRef = useRef(null);
  const descRef = useRef(null);
  const bgRef = useRef(null);
  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const cursorRef = useRef(null);
  const particleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const rowRef = useRef(null);

  // Custom cursor effect
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    document.addEventListener('mousemove', moveCursor);
    return () => document.removeEventListener('mousemove', moveCursor);
  }, []);

  // Particle animation
  useEffect(() => {
    const particles = particleRef.current;
    if (!particles) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = `absolute w-1 h-1 rounded-full opacity-60 pointer-events-none`;
      particle.style.background = projects[activeIndex]?.color || '#FFD700';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particles.appendChild(particle);

      gsap.fromTo(particle,
        { scale: 0, rotation: 0 },
        {
          scale: Math.random() * 2 + 1,
          rotation: Math.random() * 360,
          duration: Math.random() * 3 + 2,
          ease: 'power2.out',
          onComplete: () => particle.remove()
        }
      );

      gsap.to(particle, {
        y: -100,
        x: (Math.random() - 0.5) * 200,
        opacity: 0,
        duration: Math.random() * 3 + 2,
        ease: 'power2.out'
      });
    };

    const interval = setInterval(createParticle, 500);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleCTAClick = () => {
    const next = document.querySelector('#about');

    // Enhanced exit animation
    const tl = gsap.timeline();
    tl.to(sectionRef.current, {
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.inOut'
    })
    .to(sectionRef.current, {
      yPercent: -100,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power3.out',
      onComplete: () => {
        next?.scrollIntoView({ behavior: 'smooth' });
        gsap.set(sectionRef.current, {
          clearProps: 'all',
          autoAlpha: 1,
          yPercent: 0,
          scale: 1
        });
      },
    });
  };

  // Enhanced scroll trigger with more effects
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const row = rowRef.current;
    const bg = bgRef.current;
    const header = headerRef.current;
    const progress = progressRef.current;

    if (!section || !row) return;

    const cards = Array.from(row.querySelectorAll('[data-portfolio-card]'));
    if (cards.length === 0) return;

    const getCenters = () => cards.map((el) => el.offsetLeft + el.offsetWidth / 2);

    // Card sizing: show ~2–3 cards at once to ensure horizontal overflow
    const computeCardWidth = () => Math.round(Math.min(360, Math.max(240, window.innerWidth * 0.32)));
    gsap.set(cards, { width: computeCardWidth() });

    // Runtime measurement based on actual rendered first card and CSS gap
    const getCardWidth = () => (cards[0]?.offsetWidth || computeCardWidth());
    const getGap = () => {
      const style = row ? getComputedStyle(row) : null;
      const g = style ? parseFloat(style.gap || '0') : 0;
      return isNaN(g) ? 0 : g;
    };

    const baseStep = () => getCardWidth() + getGap();
    const getStartX = () => window.innerWidth - getCardWidth();
    const getEndX = () => getStartX() - baseStep() * (projects.length - 1);

    // Background color animation based on active project
    const updateBackground = () => {
      if (bg) {
        gsap.to(bg, {
          background: '#ffffff',
          duration: 0.3,
          ease: 'power1.out'
        });
      }
    };

    // Services-like: compute totalWidth from card width + gap (measured)
    const getTotalWidth = () => {
      const cardWidth = getCardWidth();
      const gapPx = getGap();
      return (cardWidth + gapPx) * projects.length;
    };

    // Set initial position: first card aligned to the right edge
    gsap.set(row, { x: getStartX(), display: 'flex' });

    let lastProgress = 0;

    const tween = gsap.to(row, {
      x: () => getEndX(),
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getTotalWidth()}`,
        scrub: 0.5,
        pin: true,
        snap: {
          snapTo: (value) => {
            const steps = Math.max(1, projects.length - 1);
            const currentIndex = Math.round(lastProgress * steps);
            const dir = value - lastProgress >= 0 ? 1 : -1;
            const clampedIndex = gsap.utils.clamp(0, steps, currentIndex + dir);
            return clampedIndex / steps;
          },
          duration: 0.25,
          ease: 'power1.inOut',
        },
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Update progress bar
          if (progress) {
            gsap.to(progress, {
              scaleX: self.progress,
              duration: 0.1,
              ease: 'power1.inOut'
            });
          }

          const centers = getCenters();
          const x = gsap.getProperty(row, 'x');
          const viewportCenter = -x + window.innerWidth / 2;
          let best = 0, bestDist = Infinity;

          centers.forEach((val, i) => {
            const d = Math.abs(viewportCenter - val);
            if (d < bestDist) {
              bestDist = d;
              best = i;
            }
          });

          if (best !== activeIndex) {
            setActiveIndex(best);
          }

          // Keep the existing card scale/opacity logic
          cards.forEach((el, i) => {
            const d = Math.abs(viewportCenter - centers[i]);
            const factor = Math.max(0, 1 - d / (el.offsetWidth * 1.2));
            const scale = 0.88 + 0.12 * factor;
            const opacity = 0.5 + 0.5 * factor;
            const rotationY = (i === best) ? 0 : (i < best ? -5 : 5);
            const z = factor * 50;

            gsap.to(el, {
              scale,
              opacity,
              rotationY,
              z,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: true
            });
          });

          // Track last progress to limit snap to +/- 1 step
          lastProgress = self.progress;
        },
      },
    });

    // Header parallax effect
    if (header) {
      gsap.fromTo(header,
        { y: 0, opacity: 1 },
        {
          y: -50,
          opacity: 0.8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    }

    const onResize = () => { gsap.set(cards, { width: computeCardWidth() }); ScrollTrigger.refresh(); };
    window.addEventListener('resize', onResize);

    // Initial background update
    updateBackground();

    return () => {
      window.removeEventListener('resize', onResize);
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [activeIndex]);

  // Enhanced cursor-driven scroll with magnetic effect
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const onMouseMove = (e) => {
      const rect = row.getBoundingClientRect();
      const pos = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      const t = pos / rect.width;
      const max = row.scrollWidth - row.clientWidth;

      // Magnetic scroll with easing
      gsap.to(row, {
        scrollLeft: t * max,
        duration: 0.6,
        ease: 'power3.out'
      });

      // Update cursor style
      const cursor = cursorRef.current;
      if (cursor) {
        gsap.to(cursor, {
          scale: isHovering ? 1.5 : 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    };

    const updateActive = () => {
      const center = row.scrollLeft + row.clientWidth / 2;
      const cards = Array.from(row.querySelectorAll('[data-portfolio-card]'));
      let best = 0, bestDist = Infinity;

      cards.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const baseLeft = row.getBoundingClientRect().left;
        const cardCenter = (r.left - baseLeft) + row.scrollLeft + r.width / 2;
        const d = Math.abs(center - cardCenter);
        if (d < bestDist) { bestDist = d; best = i; }
      });

      if (best !== activeIndex) {
        setActiveIndex(best);
      }

      // Enhanced card focus animations
      cards.forEach((el, i) => {
        const isActive = i === best;
        const timeline = gsap.timeline();

        timeline.to(el, {
          scale: isActive ? 1.05 : 0.9,
          opacity: isActive ? 1 : 0.6,
          rotationY: isActive ? 0 : (i < best ? -3 : 3),
          duration: 0.4,
          ease: 'power3.out'
        });

        if (isActive) {
          timeline.to(el, {
            boxShadow: `0 20px 40px ${projects[i]?.color}40`,
            duration: 0.3,
            ease: 'power2.out'
          }, '-=0.2');
        }
      });
    };

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    const supportsFine = window.matchMedia('(pointer: fine)').matches;
    if (supportsFine) {
      row.addEventListener('mousemove', onMouseMove);
      row.addEventListener('mouseenter', onMouseEnter);
      row.addEventListener('mouseleave', onMouseLeave);
    }

    row.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    updateActive();

    return () => {
      if (supportsFine) {
        row.removeEventListener('mousemove', onMouseMove);
        row.removeEventListener('mouseenter', onMouseEnter);
        row.removeEventListener('mouseleave', onMouseLeave);
      }
      row.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [activeIndex, isHovering]);

  // Enhanced description animation with typewriter effect
  useEffect(() => {
    if (!descRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(descRef.current,
      { autoAlpha: 0, y: 20, scale: 0.95 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );

    // Color accent animation
    const activeProject = projects[activeIndex];
    if (activeProject) {
      gsap.to(descRef.current.querySelectorAll('.accent-color'), {
        color: activeProject.color,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [activeIndex]);

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 rounded-full pointer-events-none z-50 mix-blend-difference bg-white"
        style={{ display: window.matchMedia('(pointer: fine)').matches ? 'block' : 'none' }}
      />

      <section ref={sectionRef} className="relative py-16 overflow-hidden">
        {/* Animated Background */}
        <div
          ref={bgRef}
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: '#ffffff'
          }}
        />

        {/* Particle System */}
        <div ref={particleRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-40">
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0"
            style={{
              background: `linear-gradient(90deg, ${projects[activeIndex]?.color}, ${projects[activeIndex]?.color}80)`
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">


          {/* Enhanced Cards Row */}
          <div
            ref={rowRef}
            className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-none"
            style={{ scrollBehavior: 'smooth' }}
          >
            {projects.map((p, i) => (
              <div
                key={i}
                data-portfolio-card
                className="snap-start will-change-transform flex-shrink-0 transform-gpu perspective-1000"
                onClick={p.cta ? handleCTAClick : undefined}
                role={p.cta ? 'button' : undefined}
                style={{
                  filter: i === activeIndex ? 'none' : 'grayscale(20%) brightness(0.9)'
                }}
              >
                <PortfolioCard image={gambar} title={p.title || ''} variant="light" />
              </div>
            ))}
          </div>



        </div>
      </section>
    </>
  );
};

export default Portfolio;