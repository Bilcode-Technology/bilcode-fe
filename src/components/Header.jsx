import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const Header = ({ isDropdownVisible, onDropdownToggle }) => {
  // Refs
  const headerRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationFrameRef = useRef(null);

  // State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // GSAP Dynamic Loading with Error Handling
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.gsap) {
      setGsapReady(true);
      return;
    }

    let script = null;
    const loadGSAP = () => {
      script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
      script.async = true;

      script.onload = () => {
        setGsapReady(true);
      };

      script.onerror = () => {
        console.warn("GSAP failed to load, animations will be disabled");
      };

      document.head.appendChild(script);
    };

    loadGSAP();

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Optimized Scroll Handler
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        animationFrameRef.current = requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Initial Header Animation
  useLayoutEffect(() => {
    if (!gsapReady || !headerRef.current) return;

    const tl = window.gsap.timeline();

    tl.set(headerRef.current, { y: -100, opacity: 0 }).to(headerRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.1,
    });

    return () => tl.kill();
  }, [gsapReady]);

  // Enhanced Dropdown Show Animation
  const showDropdown = useCallback(() => {
    if (!gsapReady || !dropdownRef.current || isAnimating) return;

    setIsAnimating(true);
    onDropdownToggle(true);

    const tl = window.gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    // Set initial state
    tl.set(dropdownRef.current, {
      autoAlpha: 0,
      y: -20,
      scale: 0.95,
      transformOrigin: "top center",
    });

    // Animate container
    tl.to(dropdownRef.current, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });

    // Animate menu items with stagger
    const menuItems = dropdownRef.current.querySelectorAll(".mega-menu-item");
    if (menuItems.length) {
      tl.fromTo(
        menuItems,
        {
          y: 20,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
          stagger: {
            amount: 0.2,
            from: "start",
          },
        },
        "-=0.2"
      );
    }

    return () => tl.kill();
  }, [gsapReady, onDropdownToggle, isAnimating]);

  // Enhanced Dropdown Hide Animation
  const hideDropdown = useCallback(() => {
    if (!gsapReady || !dropdownRef.current || isAnimating) return;

    setIsAnimating(true);

    const tl = window.gsap.timeline({
      onComplete: () => {
        setActiveSubmenu(null);
        onDropdownToggle(false);
        setIsAnimating(false);
      },
    });

    // Animate menu items out first
    const menuItems = dropdownRef.current.querySelectorAll(".mega-menu-item");
    if (menuItems.length) {
      tl.to(menuItems, {
        y: -10,
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: "power3.in",
        stagger: {
          amount: 0.1,
          from: "end",
        },
      });
    }

    // Then animate container
    tl.to(
      dropdownRef.current,
      {
        autoAlpha: 0,
        y: -20,
        scale: 0.95,
        duration: 0.25,
        ease: "power3.in",
      },
      "-=0.1"
    );

    return () => tl.kill();
  }, [gsapReady, onDropdownToggle, isAnimating]);

  // Improved Mouse Handlers with Debouncing
  const handleMouseEnter = useCallback(
    (submenuContent) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (submenuContent) {
        setActiveSubmenu(submenuContent);
        showDropdown();
      }
    },
    [showDropdown]
  );

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      hideDropdown();
    }, 150);
  }, [hideDropdown]);

  // Mobile Menu with Enhanced Animation

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
  }, []);

  // Enhanced Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          if (isMobileMenuOpen) {
            closeMobileMenu();
          } else if (isDropdownVisible) {
            hideDropdown();
          }
          break;
        case "Tab":
          if (isDropdownVisible && !dropdownRef.current?.contains(e.target)) {
            hideDropdown();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, isDropdownVisible, closeMobileMenu, hideDropdown]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Memoized Navigation Data
  const navItems = useMemo(
    () => [
      {
        label: "Services",
        type: "mega-menu",
        megaMenuContent: {
          featuredCards: [
            {
              title: "Web Development",
              description: "Full-stack modern web solutions",
              icon: "🌐",
              bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
              href: "/services#web-development",
            },
            {
              title: "Mobile App Development",
              description: "Native iOS & Android applications",
              icon: "📱",
              bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
              href: "/services#mobile-app",
            },
          ],
          smallCards: [
            {
              title: "UI/UX Design",
              description: "User-centered design approach",
              icon: "🎨",
              href: "/services#ui-ux-design",
            },
            {
              title: "Backend & API",
              description: "Robust server architecture",
              icon: "⚙️",
              href: "/services#backend-api",
            },
            {
              title: "Maintenance & Support",
              description: "24/7 technical assistance",
              icon: "🛠️",
              href: "/services#maintenance-support",
            },
            {
              title: "AI Integration & Automation",
              description: "Smart solutions integration",
              icon: "🤖",
              href: "/services#ai-integration",
            },
          ],
          whatsNew: {
            title: "Our Expertise",
            items: [
              "Cloud Infrastructure Setup",
              "DevOps & CI/CD Pipeline",
              "Performance Optimization",
              "Security Implementation",
            ],
            buttonText: "View All Services",
            buttonHref: "/services",
          },
        },
      },
      {
        label: "Portfolio",
        type: "mega-menu",
        megaMenuContent: {
          featuredCards: [
            {
              title: "All Projects",
              description: "Comprehensive project showcase",
              icon: "📂",
              bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
              href: "/portfolio",
            },
            {
              title: "Case Studies",
              description: "In-depth project analysis",
              icon: "📊",
              bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
              href: "/portfolio/case-studies",
            },
          ],
          smallCards: [
            {
              title: "Startups",
              description: "Innovative startup solutions",
              icon: "🚀",
              href: "/portfolio#startups",
            },
            {
              title: "Government Projects",
              description: "Public sector solutions",
              icon: "🏛️",
              href: "/portfolio#government",
            },
            {
              title: "E-commerce",
              description: "Online retail platforms",
              icon: "🛒",
              href: "/portfolio#ecommerce",
            },
            {
              title: "Fintech",
              description: "Financial technology solutions",
              icon: "💳",
              href: "/portfolio#fintech",
            },
          ],
          whatsNew: {
            title: "Recent Projects",
            items: [
              "AI-powered Analytics Dashboard",
              "Multi-vendor Marketplace Platform",
              "Government Digital Services",
              "Real-time Trading Application",
            ],
            buttonText: "Explore Portfolio",
            buttonHref: "/portfolio",
          },
        },
      },
      {
        label: "About",
        type: "mega-menu",
        megaMenuContent: {
          featuredCards: [
            {
              title: "Our Story",
              description: "Journey of innovation and growth",
              icon: "📖",
              bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-600",
              href: "/about#our-story",
            },
            {
              title: "Our Team",
              description: "Meet the talented professionals",
              icon: "👥",
              bgColor: "bg-gradient-to-br from-teal-500 to-teal-600",
              href: "/about#our-team",
            },
          ],
          smallCards: [
            {
              title: "Our Values",
              description: "What drives our mission",
              icon: "⭐",
              href: "/about#our-values",
            },
            {
              title: "Culture & Career",
              description: "Join our growing team",
              icon: "🌱",
              href: "/careers",
            },
            {
              title: "Testimonials",
              description: "What our clients say",
              icon: "💬",
              href: "/about#testimonials",
            },
          ],
          whatsNew: {
            title: "Company Highlights",
            items: [
              "50+ Successful Projects Delivered",
              "Award-winning Design Team",
              "ISO 27001 Security Certified",
              "24/7 Customer Support",
            ],
            buttonText: "Learn About Us",
            buttonHref: "/about",
          },
        },
      },
      {
        label: "Blog",
        type: "mega-menu",
        megaMenuContent: {
          featuredCards: [
            {
              title: "All Articles",
              description: "Latest insights and tutorials",
              icon: "📝",
              bgColor: "bg-gradient-to-br from-rose-500 to-rose-600",
              href: "/blog",
            },
            {
              title: "Engineering",
              description: "Technical deep-dives and best practices",
              icon: "⚡",
              bgColor: "bg-gradient-to-br from-amber-500 to-amber-600",
              href: "/blog/engineering",
            },
          ],
          smallCards: [
            {
              title: "UI/UX & Design",
              description: "Design trends and insights",
              icon: "🎯",
              href: "/blog/design",
            },
            {
              title: "DevOps & Cloud",
              description: "Infrastructure and deployment",
              icon: "☁️",
              href: "/blog/devops",
            },
            {
              title: "Company Updates",
              description: "Latest news and announcements",
              icon: "📢",
              href: "/blog/updates",
            },
            {
              title: "Tutorials",
              description: "Step-by-step guides",
              icon: "🎓",
              href: "/blog/tutorials",
            },
          ],
          whatsNew: {
            title: "Latest Posts",
            items: [
              "Building Scalable React Applications",
              "AI Integration in Modern Development",
              "Best Practices for API Design",
              "Cloud Security Implementation",
            ],
            buttonText: "Read All Articles",
            buttonHref: "/blog",
          },
        },
      },
      {
        label: "Education",
        type: "mega-menu",
        megaMenuContent: {
          featuredCards: [
            {
              title: "Bootcamp & Intensive Class",
              description: "Accelerated tech skill development",
              icon: "🎯",
              bgColor: "bg-gradient-to-br from-green-500 to-green-600",
              href: "/education#bootcamp",
            },
            {
              title: "1-on-1 Mentoring",
              description: "Personal guidance for career growth",
              icon: "👨‍🏫",
              bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
              href: "/education#mentoring",
            },
          ],
          smallCards: [
            {
              title: "Workshops & Webinars",
              description: "Community learning events",
              icon: "🎤",
              href: "/education#workshops",
            },
            {
              title: "Tech for Students",
              description: "Special programs for students",
              icon: "🎓",
              href: "/education#students",
            },
            {
              title: "Digital Skill Certification",
              description: "Professional tech certifications",
              icon: "🏆",
              href: "/education#certification",
            },
          ],
          whatsNew: {
            title: "Available Programs",
            items: [
              "React & Next.js Bootcamp",
              "Mobile Development with Flutter",
              "AI/ML Integration Workshop",
              "Full-Stack Developer Certification",
            ],
            buttonText: "Explore Programs",
            buttonHref: "/education",
          },
        },
      },
      {
        label: "Assisted Project",
        type: "mega-menu",
        megaMenuContent: {
          featuredCards: [
            {
              title: "Project Assistance for Students",
              description: "Collaborative academic project support",
              icon: "🤝",
              bgColor: "bg-gradient-to-br from-violet-500 to-violet-600",
              href: "/assisted-project#students",
            },
            {
              title: "Final Project Mentoring",
              description: "Thesis and capstone guidance",
              icon: "📋",
              bgColor: "bg-gradient-to-br from-pink-500 to-pink-600",
              href: "/assisted-project#final-project",
            },
          ],
          smallCards: [
            {
              title: "Prototype & MVP Build",
              description: "From idea to working prototype",
              icon: "🛠️",
              href: "/assisted-project#prototype",
            },
            {
              title: "NDA-based Development",
              description: "Secure and confidential service",
              icon: "🔒",
              href: "/assisted-project#nda",
            },
            {
              title: "Support & Revisions",
              description: "Ongoing assistance and improvements",
              icon: "🔄",
              href: "/assisted-project#support",
            },
          ],
          whatsNew: {
            title: "Our Approach",
            items: [
              "Ethical collaboration principles",
              "Educational value focused",
              "Complete documentation provided",
              "Post-delivery support included",
            ],
            buttonText: "Learn More",
            buttonHref: "/assisted-project",
          },
        },
      },
      {
        label: "Contact",
        type: "mega-menu",
        megaMenuContent: {
          featuredCards: [
            {
              title: "Contact Form",
              description: "Send us a detailed message",
              icon: "📧",
              bgColor: "bg-gradient-to-br from-slate-500 to-slate-600",
              href: "/contact#form",
            },
            {
              title: "Schedule a Call",
              description: "Book a consultation meeting",
              icon: "📞",
              bgColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
              href: "/contact#schedule",
            },
          ],
          smallCards: [
            {
              title: "Office Location",
              description: "Visit our physical office",
              icon: "📍",
              href: "/contact#location",
            },
            {
              title: "Request a Quote",
              description: "Get project estimation",
              icon: "💰",
              href: "/contact#quote",
            },
          ],
          whatsNew: {
            title: "Get in Touch",
            items: [
              "Response within 24 hours",
              "Free initial consultation",
              "Multiple communication channels",
              "Flexible meeting schedules",
            ],
            buttonText: "Contact Us Now",
            buttonHref: "/contact",
          },
        },
      },
    ],
    []
  );

  // Dynamic Header Classes
  const headerClasses = useMemo(() => {
    const baseClasses =
      "w-full fixed top-0 left-0 z-50 transition-all duration-500 ease-out";

    if (isDropdownVisible) {
      return `${baseClasses} bg-white/98 backdrop-blur-xl shadow-2xl shadow-black/10 border-b border-gray-200/60`;
    }

    if (scrolled) {
      return `${baseClasses} bg-white/95 backdrop-blur-xl shadow-xl shadow-black/5 border-b border-gray-100/50`;
    }

    return `${baseClasses} bg-white/80 backdrop-blur-md`;
  }, [isDropdownVisible, scrolled]);

  return (
    <>
      <header
        ref={headerRef}
        className={headerClasses}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <div className="flex-shrink-0 group">
              <a
                href="#home"
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg p-1"
              >
                <div className="text-2xl lg:text-3xl font-black text-black transition-colors duration-300">
                  Bilcode
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex absolute inset-x-0 items-center justify-center space-x-1">
              {navItems.map((item, idx) => (
                <div
                  key={idx}
                  className="relative group"
                  onMouseEnter={() =>
                    handleMouseEnter(
                      item.type === "mega-menu" ? item.megaMenuContent : null
                    )
                  }
                >
                  <a
                    href={item.href || "#"}
                    className="relative px-4 py-3 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-blue-50/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 group"
                    aria-haspopup={item.type === "mega-menu" ? "true" : "false"}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-3/4 rounded-full"></div>
                  </a>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <div
          ref={dropdownRef}
          className="absolute left-0 w-full top-full z-40"
          style={{
            visibility: "hidden",
            opacity: 0,
            transform: "translateY(-20px) scale(0.95)",
          }}
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }}
        >
          <div className="bg-white/98 backdrop-blur-xl shadow-2xl shadow-black/10 border-2 border-gray-100/50 rounded-b-3xl">
            {activeSubmenu && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Featured Cards */}
                  <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeSubmenu.featuredCards?.map((card, i) => (
                      <a
                        key={i}
                        href={card.href}
                        className={`mega-menu-item group relative overflow-hidden ${card.bgColor} text-white p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl`}
                      >
                        <div className="relative z-10">
                          <div className="text-4xl mb-4">{card.icon}</div>
                          <h3 className="text-xl font-bold mb-2">
                            {card.title}
                          </h3>
                          <p className="text-sm opacity-90 mb-4">
                            {card.description}
                          </p>
                          <div className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                            Learn more
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </a>
                    ))}

                    {activeSubmenu.smallCards?.map((card, i) => (
                      <a
                        key={i}
                        href={card.href}
                        className="mega-menu-item group bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:shadow-lg border border-gray-200/50 hover:border-blue-200/50"
                      >
                        <div className="text-2xl mb-3">{card.icon}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {card.description}
                        </p>
                        <div className="flex items-center text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                          Explore
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* What's New Section */}
                  <div className="lg:col-span-1 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100/50">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">
                      {activeSubmenu.whatsNew?.title}
                    </h4>
                    <ul className="space-y-3 mb-8">
                      {activeSubmenu.whatsNew?.items.map((item, i) => (
                        <li
                          key={i}
                          className="mega-menu-item flex items-start text-sm text-gray-700"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={activeSubmenu.whatsNew?.buttonHref}
                      className="mega-menu-item inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 group"
                    >
                      {activeSubmenu.whatsNew?.buttonText}
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transform transition-all duration-500 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xl">
          <div className="flex flex-col h-full pt-20 pb-6 overflow-y-auto">
            <div className="px-6 flex-1">
              <nav className="space-y-8">
                {navItems.map((item, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.label}
                      </h3>
                    </div>

                    {item.megaMenuContent && (
                      <div className="ml-12 space-y-3">
                        {[
                          ...item.megaMenuContent.featuredCards,
                          ...item.megaMenuContent.smallCards,
                        ].map((card, i) => (
                          <a
                            key={i}
                            href={card.href}
                            onClick={closeMobileMenu}
                            className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-blue-50/80 transition-all duration-300 border border-transparent hover:border-blue-200/50"
                          >
                            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                              {card.icon}
                            </span>
                            <div>
                              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                {card.title}
                              </div>
                              <div className="text-sm text-gray-600">
                                {card.description}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;
