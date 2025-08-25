import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";

import { navItems } from "../data/navItems";
import { ChevronDown, Languages } from "lucide-react";
import gsap from "gsap";

const Header = ({ isDropdownVisible, onDropdownToggle }) => {
  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredItem2, setHoveredItem2] = useState(null);

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
      // animasi masuk
      gsap.killTweensOf(panel);
      gsap.set(panel, { visibility: "visible" });
      const tl = gsap.timeline();
      tl.to(panel, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      }).from(
        panel.querySelectorAll(".mm-card"),
        {
          autoAlpha: 0,
          y: 12,
          scale: 0.98,
          stagger: 0.05,
          duration: 0.25,
          ease: "power2.out",
        },
        "-=0.1"
      );
    } else {
      // langsung hilang (tanpa transisi)
      gsap.killTweensOf(panel);
      gsap.set(panel, {
        autoAlpha: 0,
        y: -16,
        visibility: "hidden",
      });
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

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollDirection("down"); // scroll ke bawah
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up"); // scroll ke atas
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
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
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to(el, {
      scale: 0.92,
      // y: -4,
      duration: 0.2,
      // boxShadow: "0 25px 35px -12px rgba(0,0,0,0.25)",
    })
      .to(el.querySelector(".mm-overlay"), { autoAlpha: 1, duration: 0.2 }, "<")
      .to(
        el.querySelector(".mm-bg"),
        { x: 12, y: -12, scale: 1.05, duration: 0.4 },
        "<"
      )
      .to(
        el.querySelector(".mm-icon"),
        { scale: 1.08, rotate: 6, duration: 0.25 },
        "<"
      )
      .to(
        el.querySelector(".mm-arrow"),
        { x: 8, scale: 1.08, duration: 0.2 },
        "<"
      );

    // Loop background gradient subtly while hovered
    const loop = gsap.to(el.querySelector(".mm-bg"), {
      xPercent: 5,
      yPercent: -5,
      rotation: 2,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    cardMotion.current.set(el, loop);
  }, []);

  const onCardLeave = useCallback((el) => {
    // Stop and kill loop animation if exists
    const loop = cardMotion.current.get(el);
    if (loop) {
      loop.kill();
      cardMotion.current.delete(el);
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to(el, {
      scale: 1,
      y: 0,
      duration: 0.2,
      // boxShadow:
      //   "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
    })
      .to(el.querySelector(".mm-overlay"), { autoAlpha: 0, duration: 0.2 }, "<")
      .to(
        el.querySelector(".mm-bg"),
        { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.3 },
        "<"
      )
      .to(
        el.querySelector(".mm-icon"),
        { scale: 1, rotate: 0, duration: 0.2 },
        "<"
      )
      .to(
        el.querySelector(".mm-arrow"),
        { x: 0, scale: 1, duration: 0.2 },
        "<"
      );
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
    const baseClasses = "w-full fixed top-0 left-0 z-50";

    if (isDropdownVisible) {
      return `${baseClasses} bg-white`;
    }

    if (scrolled) {
      return `${baseClasses}  `;
    }

    return `${baseClasses}  `;
  };

  const getNavClasses = () => {
    const baseClasses =
      "flex items-center justify-between h-16 lg:h-22 px-8 transition-transform duration-500";

    if (isDropdownVisible) {
      return `${baseClasses}`;
    }

    if (scrollY === 0) {
      return `${baseClasses} translate-y-0`;
    }

    if (scrollDirection === "down") {
      return `${baseClasses} bg-white shadow-xl rounded-2xl -translate-y-100`;
    }

    if (scrollDirection === "up") {
      return `${baseClasses} bg-white shadow-xl rounded-2xl -translate-y-0`;
    }

    return `${baseClasses}  `;
  };

  const getNavLink = () => {
    const baseClasses = "flex gap-8 items-center";

    if (isDropdownVisible) {
      return `${baseClasses}`;
    }

    // if (scrolled) {
    //   return `${baseClasses} opacity-0 `;
    // }

    return `${baseClasses}  `;
  };

  // Render navigation item
  const renderNavItem = (item, index) => {
    const isActiveMega = hoveredItem === index; // mega-menu
    const isActiveLink = hoveredItem2 === index; // link biasa
    const isActive = isActiveMega || isActiveLink;

    const isAnyHovered = hoveredItem !== null || hoveredItem2 !== null;

    // kalau ada yang dihover → item aktif = hitam, lainnya = abu
    // kalau tidak ada yang dihover → semua hitam
    const getTextColor = () => {
      if (isActive) return "text-black";
      if (isAnyHovered) return "text-gray-400";
      return "text-black";
    };

    if (item.type === "link") {
      return (
        <a
          key={index}
          href={item.href}
          onMouseEnter={() => setHoveredItem2(index)}
          onMouseLeave={() => setHoveredItem2(null)}
          className={`cursor-pointer px-4 py-6 font-medium rounded-md transition-colors duration-200 ease-in-out ${getTextColor()}`}
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
          onMouseEnter={() => {
            showMegaMenu(item.megaMenuContent, index);
            setHoveredItem2(index);
          }}
          onMouseLeave={() => {
            hideMegaMenu();
            setHoveredItem2(null);
          }}
        >
          <button
            className={`cursor-pointer flex items-center px-4 py-6 font-medium rounded-md transition-colors duration-200 ease-in-out ${getTextColor()}`}
            aria-haspopup="true"
            aria-expanded={isActiveMega}
          >
            {item.label}
          </button>
        </div>
      );
    }

    if (item.type === "dropdown") {
      return (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => setHoveredItem2(index)}
          onMouseLeave={() => setHoveredItem2(null)}
        >
          <button
            className={`flex items-center px-4 py-6 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out ${getTextColor()}`}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </button>

          {isActiveMega && (
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
        <div className="grid grid-cols-2 gap-4 w-full ">
          {activeMenu.cards?.map((card, i) => {
            return (
              <a
                key={`card-${i}`}
                href={card.href}
                onMouseEnter={(e) => onCardEnter(e.currentTarget)}
                onMouseLeave={(e) => onCardLeave(e.currentTarget)}
                className={`mm-card group relative rounded-xl text-white ${card.bgColor} flex flex-col overflow-hidden p-4 lg:p-6 w-full max-w-full h-40 lg:h-44`}
              >
                {/* Background gradient overlay */}
                {/* <div className="mm-overlay absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 pointer-events-none"></div>
                <div className="mm-bg absolute -inset-6 rounded-2xl opacity-60 pointer-events-none bg-[radial-gradient(120%_120%_at_10%_0%,rgba(255,255,255,0.35),rgba(255,255,255,0)_60%)]"></div> */}

                {/* Animated background particles */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/5 rounded-full blur-lg"></div>

                <div className="relative z-10 flex flex-col gap-2 h-full justify-center">
                  <div className="flex-grow flex flex-col justify-end">
                    <h3 className="font-bold text-base lg:text-xl line-clamp-2">
                      {card.title}
                    </h3>
                  </div>
                  <div className="font-medium text-xs lg:text-sm flex opacity-80">
                    Pelajari Lebih Lanjut
                    <span className="mm-arrow ml-2 inline-block">&rarr;</span>
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
            const isLastOdd =
              allCards.length % 2 === 1 &&
              i === allCards.length - 1 &&
              !card.fullWidth;
            return (
              <a
                key={`ind-card-${i}`}
                href={card.href}
                onMouseEnter={(e) => onCardEnter(e.currentTarget)}
                onMouseLeave={(e) => onCardLeave(e.currentTarget)}
                className={`mm-card group relative rounded-xl text-white ${
                  card.bgColor
                } flex flex-col overflow-hidden shadow-md p-4 lg:p-6 w-full max-w-full h-40 lg:h-44 ${
                  card.fullWidth || isLastOdd
                    ? "sm:col-span-2"
                    : "sm:col-span-1"
                }`}
              >
                {/* Subtle background effects */}
                <div className="mm-overlay absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 pointer-events-none"></div>
                <div className="mm-bg absolute -inset-6 rounded-2xl opacity-60 pointer-events-none bg-[radial-gradient(120%_120%_at_10%_0%,rgba(255,255,255,0.35),rgba(255,255,255,0)_60%)]"></div>

                <div className="relative z-10 flex flex-col h-full justify-center items-center text-center">
                  <div className="mm-icon flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 text-xl lg:text-2xl text-white flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl mb-3">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-sm lg:text-base mb-2 line-clamp-2">
                    {card.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-white/80 leading-relaxed flex-1 line-clamp-2">
                    {card.description}
                  </p>
                  <div className="font-semibold text-xs lg:text-sm flex items-center justify-center opacity-80 mt-3">
                    Pelajari Lebih Lanjut
                    <span className="mm-arrow ml-2 inline-block">&rarr;</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      );
    } else {
      content = (
        <div className="grid grid-cols-2 gap-4 w-full ">
          {activeMenu.cards?.map((card, i) => {
            return (
              <a
                key={`card-${i}`}
                href={card.href}
                onMouseEnter={(e) => onCardEnter(e.currentTarget)}
                onMouseLeave={(e) => onCardLeave(e.currentTarget)}
                className={`mm-card group relative rounded-xl ${card.bgColor} flex flex-col overflow-hidden p-4 lg:p-6 w-full max-w-full h-40 lg:h-44 hover:bg-black hover:text-white`}
              >
                {/* Background gradient overlay */}
                {/* <div className="mm-overlay absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 pointer-events-none"></div>
                <div className="mm-bg absolute -inset-6 rounded-2xl opacity-60 pointer-events-none bg-[radial-gradient(120%_120%_at_10%_0%,rgba(255,255,255,0.35),rgba(255,255,255,0)_60%)]"></div> */}

                {/* Animated background particles */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/5 rounded-full blur-lg"></div>

                <div className="relative z-10 flex flex-col gap-2 h-full justify-center">
                  <div className="flex-grow flex flex-col justify-end">
                    <h3 className="font-bold text-base lg:text-xl line-clamp-2">
                      {card.title}
                    </h3>
                  </div>
                  <div className="font-medium text-xs lg:text-sm flex opacity-80">
                    Pelajari Lebih Lanjut
                    <span className="mm-arrow ml-2 inline-block">&rarr;</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto py-8 lg:py-12 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 h-full">
          <div className="lg:col-span-3">{content}</div>
          <div className="lg:col-span-2 flex flex-col min-h-0">
            <div className="">
              <h3 className="mm-card font-semibold text-lg md:text-2xl text-gray-900 mb-4 relative z-10">
                {activeMenu.whatsNew?.title}
              </h3>
              <ul className="space-y-2 mb-6 lg:mb-8 flex-grow relative z-10 overflow-y-hidden">
                {activeMenu.whatsNew?.items.map((item, i) => (
                  <li
                    key={`new-${i}`}
                    className="mm-card flex items-start space-x-3 group cursor-pointer"
                  >
                    <span className="text-gray-700 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 text-sm lg:text-base leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mm-card">
                <a className=" cursor-pointer inline-flex items-center justify-center font-medium px-4 md:px-10 py-3 lg:py-3 rounded-full text-sm md:text-lg bg-gray-200 z-10 hover:scale-110 transition-all duration-300 group">
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
      </div>
    );
  };

  return (
    <>
      <header ref={headerRef} className={getHeaderClasses()}>
        <div className="max-w-[950px] mx-auto pt-10">
          <div className={getNavClasses()}>
            <div className={getNavLink()}>
              {/* Logo */}
              <div className="flex-shrink-0">
                <a
                  href="#home"
                  className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 -m-2"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-black">
                    Bilcode
                  </div>
                </a>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center justify-center">
                {navItems.map((item, index) => renderNavItem(item, index))}
              </nav>
            </div>

            {/* Mobile Menu Button */}
            {/* <div className="flex items-center">
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
            </div> */}
          </div>
        </div>

        <a
          href="http://wa.me/6285128004772"
          className="fixed top-11 md:top-14 right-[5%] md:right-[18%] z-[60] cursor-pointer bg-black hover:scale-110 text-lg font-medium text-white px-8 py-3 rounded-full transition-all duration-300"
        >
          Chat Sekarang
        </a>

        {/* Mega Menu Dropdown */}
        <div
          ref={megaMenuRef}
          style={{
            visibility: "hidden",
            opacity: 0,
            // transform: "translateY(-20px)",
            // transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            // backdropFilter: "blur(0px)",
          }}
          className="absolute left-0 w-full top-full z-40 bg-white h-[420px] lg:h-[480px] rounded-b-3xl overflow-hidden overflow-x-clip"
          onMouseEnter={keepMegaMenuOpen}
          onMouseLeave={hideMegaMenu}
        >
          <div className="relative z-10 h-full bg-white">
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
                        className="block font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    );
                  } else if (item.type === "mega-menu") {
                    return (
                      <div key={idx} className="space-y-4">
                        <h3 className="font-semibold text-gray-900">
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
                            <span className="mr-2 flex-shrink-0">
                              {item.icon}
                            </span>
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
