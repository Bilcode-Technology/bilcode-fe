import { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";

import { navItems } from "../data/navItems";
import { ChevronDown, Languages } from "lucide-react";
import gsap from "gsap";

const Header = ({ isDropdownVisible, onDropdownToggle }) => {
  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);


  // Refs
  const headerRef = useRef(null);
  const megaMenuRef = useRef(null);
  const timeoutRef = useRef(null);
  // Store per-card motion controllers (quickTo) active while hovered
  const cardMotion = useRef(new WeakMap());

  // GSAP animations for mega menu panel & cards
  useLayoutEffect(() => {
    if (!megaMenuRef.current) return;
    const panel = megaMenuRef.current;
    if (isDropdownVisible) {
      gsap.killTweensOf(panel);
      gsap.set(panel, { visibility: 'visible' });
      const tl = gsap.timeline();
      tl.to(panel, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' })
        .from(
          panel.querySelectorAll('.mm-card'),
          { autoAlpha: 0, y: 12, scale: 0.98, stagger: 0.05, duration: 0.25, ease: 'power2.out' },
          '-=0.1'
        );
    } else {
      gsap.to(panel, { autoAlpha: 0, y: -16, duration: 0.2, ease: 'power2.in', onComplete: () => {
        gsap.set(panel, { visibility: 'hidden' });
      }});
    }
  }, [isDropdownVisible]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu handlers
  const showMegaMenu = useCallback(
    (menuContent, itemIndex) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      setActiveMenu(menuContent);
      setHoveredItem(itemIndex);
      if (onDropdownToggle) {
        onDropdownToggle(true);
      }
    },
    [onDropdownToggle]
  );

  const hideMegaMenu = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setHoveredItem(null);
      if (onDropdownToggle) {
        onDropdownToggle(false);
      }
    }, 150);
  }, [onDropdownToggle]);

  const keepMegaMenuOpen = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Card hover animations with GSAP (bounded and loop background only while hovered)
  const onCardEnter = useCallback((el) => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.to(el, { scale: 1.03, y: -4, duration: 0.2, boxShadow: '0 25px 35px -12px rgba(0,0,0,0.25)' })
      .to(el.querySelector('.mm-overlay'), { autoAlpha: 1, duration: 0.2 }, '<')
      .to(el.querySelector('.mm-bg'), { x: 12, y: -12, scale: 1.05, duration: 0.4 }, '<')
      .to(el.querySelector('.mm-icon'), { scale: 1.08, rotate: 6, duration: 0.25 }, '<')
      .to(el.querySelector('.mm-arrow'), { x: 8, scale: 1.08, duration: 0.2 }, '<');

    // Loop background gradient subtly while hovered
    const loop = gsap.to(el.querySelector('.mm-bg'), {
      xPercent: 5, yPercent: -5, rotation: 2, duration: 2, yoyo: true, repeat: -1,
      ease: 'sine.inOut'
    });
    cardMotion.current.set(el, loop);
  }, []);

  const onCardLeave = useCallback((el) => {
    // Stop and kill loop animation if exists
    const loop = cardMotion.current.get(el);
    if (loop) { loop.kill(); cardMotion.current.delete(el); }

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.to(el, { scale: 1, y: 0, duration: 0.2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)' })
      .to(el.querySelector('.mm-overlay'), { autoAlpha: 0, duration: 0.2 }, '<')
      .to(el.querySelector('.mm-bg'), { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.3 }, '<')
      .to(el.querySelector('.mm-icon'), { scale: 1, rotate: 0, duration: 0.2 }, '<')
      .to(el.querySelector('.mm-arrow'), { x: 0, scale: 1, duration: 0.2 }, '<');
  }, []);

  // Mobile menu handlers
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? "hidden" : "";
      return newState;
    });
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isMobileMenuOpen) {
          closeMobileMenu();
        } else if (isDropdownVisible) {
          hideMegaMenu();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, isDropdownVisible, closeMobileMenu, hideMegaMenu]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.body.style.overflow = "";
    };
  }, []);

  // Header classes
  const getHeaderClasses = () => {
    const baseClasses =
      "w-full fixed top-0 left-0 z-50 transition-all duration-300 border-b backdrop-blur-md";

    if (isDropdownVisible) {
      return `${baseClasses} bg-white/95 shadow-lg border-gray-200`;
    }

    if (scrolled) {
      return `${baseClasses} bg-white/95 shadow-md border-gray-100`;
    }

    return `${baseClasses} bg-white/90 border-transparent`;
  };

  // Render navigation item
  const renderNavItem = (item, index) => {
    const isActive = hoveredItem === index;

    if (item.type === "link") {
      return (
        <a
          key={index}
          href={item.href}
          className={`px-4 py-2 text-sm font-medium text-gray-700 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:text-blue-600 hover:underline underline-offset-8 decoration-2 decoration-blue-500/60 ${
            isActive ? "text-blue-600" : ""
          }`}
        >
          {item.label}
        </a>
      );
    }

    if (item.type === "mega-menu") {
      return (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => showMegaMenu(item.megaMenuContent, index)}
          onMouseLeave={hideMegaMenu}
        >
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:text-blue-600 hover:underline underline-offset-8 decoration-2 decoration-blue-500/60 ${
              isActive ? "text-blue-600" : ""
            }`}
            aria-haspopup="true"
            aria-expanded={isActive}
          >
            {item.label}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                isActive ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      );
    }

    if (item.type === "dropdown") {
      return (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:text-blue-600 hover:underline underline-offset-8 decoration-2 decoration-blue-500/60 ${
              isActive ? "text-blue-600" : ""
            }`}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                isActive ? "rotate-180" : ""
              }`}
            />
          </button>

          {isActive && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
              {item.items.map((subItem, subIndex) => (
                <a
                  key={subIndex}
                  href={subItem.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200 ease-in-out"
                >
                  {subItem.title}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  // Render mega menu content
  const renderMegaMenu = () => {
    if (!activeMenu) return null;

    let content = null;

    if (activeMenu.layout === "services-layout") {
      content = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full">
          {activeMenu.cards?.map((card, i) => {
            const isLastOdd =
              activeMenu.cards &&
              activeMenu.cards.length % 2 === 1 &&
              i === activeMenu.cards.length - 1 &&
              !card.fullWidth;
            return (
              <a
                key={`card-${i}`}
                href={card.href}
                onMouseEnter={(e) => onCardEnter(e.currentTarget)}
                onMouseLeave={(e) => onCardLeave(e.currentTarget)}
                className={`mm-card group relative rounded-xl text-white ${card.bgColor} flex flex-col overflow-hidden shadow-md p-4 lg:p-6 w-full max-w-full h-40 lg:h-44 ${
                  card.fullWidth || isLastOdd ? 'sm:col-span-2' : 'sm:col-span-1'
                }`}
              >
                {/* Background gradient overlay */}
                <div className="mm-overlay absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 pointer-events-none"></div>
<div className="mm-bg absolute -inset-6 rounded-2xl opacity-60 pointer-events-none bg-[radial-gradient(120%_120%_at_10%_0%,rgba(255,255,255,0.35),rgba(255,255,255,0)_60%)]"></div>

                {/* Animated background particles */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/5 rounded-full blur-lg"></div>

                <div className="relative z-10 flex flex-col h-full justify-center">
                  <div className="flex items-center justify-center mb-3">
                    <div className="mm-icon w-10 h-10 lg:w-12 lg:h-12 text-xl lg:text-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0">
                      {card.icon}
                    </div>
                  </div>
                  <div className="text-center flex-grow flex flex-col justify-center">
                    <h3 className="font-bold text-base lg:text-lg mb-2 line-clamp-2">{card.title}</h3>
                    <p className="text-xs lg:text-sm opacity-90 leading-relaxed line-clamp-2">{card.description}</p>
                  </div>
                  <div className="font-semibold text-xs lg:text-sm flex items-center justify-center opacity-80 mt-3">
                    Learn more
                    <span className="mm-arrow ml-2 inline-block">
                      &rarr;
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      );
    } else if (activeMenu.layout === "industries-layout") {
      const allCards = [
        ...(activeMenu.leftColumnCards || []),
        ...(activeMenu.middleColumnCards || []),
        ...(activeMenu.rightColumnCards || []),
      ];
      content = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full">
          {allCards.map((card, i) => {
            const isLastOdd = allCards.length % 2 === 1 && i === allCards.length - 1 && !card.fullWidth;
            return (
              <a
                key={`ind-card-${i}`}
                href={card.href}
                onMouseEnter={(e) => onCardEnter(e.currentTarget)}
                onMouseLeave={(e) => onCardLeave(e.currentTarget)}
                className={`mm-card group relative rounded-xl text-white ${card.bgColor} flex flex-col overflow-hidden shadow-md p-4 lg:p-6 w-full max-w-full h-40 lg:h-44 ${
                  card.fullWidth || isLastOdd ? 'sm:col-span-2' : 'sm:col-span-1'
                }`}
              >
                {/* Subtle background effects */}
                <div className="mm-overlay absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 pointer-events-none"></div>
<div className="mm-bg absolute -inset-6 rounded-2xl opacity-60 pointer-events-none bg-[radial-gradient(120%_120%_at_10%_0%,rgba(255,255,255,0.35),rgba(255,255,255,0)_60%)]"></div>

                <div className="relative z-10 flex flex-col h-full justify-center items-center text-center">
                  <div className="mm-icon flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 text-xl lg:text-2xl text-white flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl mb-3">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-sm lg:text-base mb-2 line-clamp-2">{card.title}</h3>
                  <p className="text-xs lg:text-sm text-white/80 leading-relaxed flex-1 line-clamp-2">
                    {card.description}
                  </p>
                  <div className="font-semibold text-xs lg:text-sm flex items-center justify-center opacity-80 mt-3">
                    Learn more
                    <span className="mm-arrow ml-2 inline-block">
                      &rarr;
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      );
    } else {
      // Default layout untuk mega-menu lainnya - 2 kolom tetap
      content = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full">
          {activeMenu.cards?.map((card, i) => {
            const isLastOdd =
              activeMenu.cards &&
              activeMenu.cards.length % 2 === 1 &&
              i === activeMenu.cards.length - 1 &&
              !card.fullWidth;
            return (
              <a
                key={`card-${i}`}
                href={card.href}
                onMouseEnter={(e) => onCardEnter(e.currentTarget)}
                onMouseLeave={(e) => onCardLeave(e.currentTarget)}
                className={`mm-card group relative rounded-xl text-white ${card.bgColor} flex flex-col overflow-hidden shadow-md p-4 lg:p-6 w-full max-w-full h-40 lg:h-44 ${
                  card.fullWidth || isLastOdd ? 'sm:col-span-2' : 'sm:col-span-1'
                }`}
              >
                {/* Enhanced background effects */}
                <div className="mm-overlay absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 pointer-events-none"></div>
<div className="mm-bg absolute -inset-6 rounded-2xl opacity-60 pointer-events-none bg-[radial-gradient(120%_120%_at_10%_0%,rgba(255,255,255,0.35),rgba(255,255,255,0)_60%)]"></div>
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex flex-col h-full justify-center">
                  <div className="flex items-center justify-center mb-3">
                    <div className="mm-icon flex-shrink-0 w-10 h-10 lg:w-14 lg:h-14 text-xl lg:text-2xl text-white flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-2xl">
                      {card.icon}
                    </div>
                  </div>
                  <div className="text-center flex-grow flex flex-col justify-center">
                    <h3 className="font-bold text-base lg:text-lg mb-2 line-clamp-2">{card.title}</h3>
                    <p className="text-xs lg:text-sm text-white/80 leading-relaxed line-clamp-2">{card.description}</p>
                  </div>
                  <div className="font-semibold text-xs lg:text-sm flex items-center justify-center opacity-80 mt-3">
                    Learn more
                    <span className="mm-arrow ml-2 inline-block">
                      &rarr;
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 h-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 h-full">
          <div className="lg:col-span-3 overflow-hidden">{content}</div>
          <div className="lg:col-span-1 flex flex-col min-h-0">
            <div className="sticky top-8 p-6 lg:p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 rounded-3xl shadow-xl border border-gray-100/50 flex flex-col backdrop-blur-sm hover:shadow-2xl transition-all duration-500 max-h-96 overflow-hidden">
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
              <h3 className="font-bold text-lg lg:text-xl text-gray-900 mb-4 lg:mb-6 relative z-10">
                {activeMenu.whatsNew?.title}
              </h3>
              <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-8 flex-grow relative z-10 overflow-y-auto">
                {activeMenu.whatsNew?.items.map((item, i) => (
                  <li key={`new-${i}`} className="flex items-start space-x-3 group cursor-pointer">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 group-hover:bg-purple-500 transition-all duration-300"></div>
                    <span className="text-gray-700 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 text-xs lg:text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={activeMenu.whatsNew?.buttonHref}
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-4 lg:px-6 py-3 lg:py-4 rounded-2xl text-xs lg:text-sm transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 mt-auto relative z-10 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">
                {activeMenu.whatsNew?.buttonText}
                </span>
                <span className="ml-2 transform group-hover:translate-x-2 group-hover:scale-110 transition-transform duration-500 relative z-10">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header ref={headerRef} className={getHeaderClasses()}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="#home"
                className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 -m-2"
              >
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Bilcode
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center gap-x-2">
              {navItems.map((item, index) => renderNavItem(item, index))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-6 h-5 relative flex flex-col justify-center space-y-1">
                  <span
                    className={`block w-full h-0.5 bg-gray-600 transition-all duration-300 ${
                      isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                    }`}
                  ></span>
                  <span
                    className={`block w-full h-0.5 bg-gray-600 transition-all duration-300 ${
                      isMobileMenuOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`block w-full h-0.5 bg-gray-600 transition-all duration-300 ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <div
          ref={megaMenuRef}
          style={{
            visibility: "hidden",
            opacity: 0,
            transform: "translateY(-20px)",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            backdropFilter: "blur(0px)",
          }}
          className="absolute left-0 w-full top-full z-40 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100/50 h-[420px] lg:h-[480px] rounded-b-3xl overflow-hidden overflow-x-clip"
          onMouseEnter={keepMegaMenuOpen}
          onMouseLeave={hideMegaMenu}
        >
          {/* Enhanced background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/80"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-100/20 to-pink-100/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 h-full">
          {renderMegaMenu()}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="absolute inset-0 bg-white">
          <div className="flex flex-col h-full pt-20 pb-8 overflow-y-auto">
            <div className="px-6 flex-1">
              <nav className="space-y-6">
                {navItems.map((item, idx) => {
                  if (item.type === "link") {
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    );
                  } else if (item.type === "mega-menu") {
                    return (
                      <div key={idx} className="space-y-4">
                        <h3 className="text-base font-semibold text-gray-900">
                          {item.label}
                        </h3>
                        {item.megaMenuContent && (
                          <div className="ml-4 space-y-4">
                            {item.megaMenuContent.cards?.map((card, i) => (
                              <a
                                key={`mobile-card-${i}`}
                                href={card.href}
                                onClick={closeMobileMenu}
                                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                              >
                                <div
                                  className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0`}
                                >
                                  {card.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="font-semibold text-gray-900 truncate">
                                    {card.title}
                                  </div>
                                  <div className="text-sm text-gray-600 line-clamp-2">
                                    {card.description}
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  } else if (item.type === "dropdown") {
                    return (
                      <div key={idx} className="space-y-4">
                        <h3 className="text-base font-semibold text-gray-900 flex items-center">
                          {item.icon && (
                            <span className="mr-2 flex-shrink-0">{item.icon}</span>
                          )}
                          {item.label}
                        </h3>
                        <div className="ml-4 space-y-2">
                          {item.items.map((subItem, subIdx) => (
                            <a
                              key={subIdx}
                              href={subItem.href}
                              onClick={closeMobileMenu}
                              className="block p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                            >
                              {subItem.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;