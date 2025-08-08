import { useRef, useState, useEffect, useCallback } from "react";

import { navItems } from "../data/navItems";
import { ChevronDown, Languages } from "lucide-react";

const Header = ({ isDropdownVisible, onDropdownToggle }) => {
  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Refs
  const headerRef = useRef(null);
  const megaMenuRef = useRef(null);
  const timeoutRef = useRef(null);

  // Enhanced animations for mega menu
  useEffect(() => {
    if (megaMenuRef.current) {
      if (isDropdownVisible) {
        megaMenuRef.current.style.visibility = "visible";
        megaMenuRef.current.style.opacity = "1";
        megaMenuRef.current.style.transform = "translateY(0)";
        megaMenuRef.current.style.backdropFilter = "blur(20px)";
      } else {
        megaMenuRef.current.style.visibility = "hidden";
        megaMenuRef.current.style.opacity = "0";
        megaMenuRef.current.style.transform = "translateY(-20px)";
        megaMenuRef.current.style.backdropFilter = "blur(0px)";
      }
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
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isActive
              ? "text-blue-600 bg-blue-50"
              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
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
            className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isActive
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
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
            className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isActive
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
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
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {activeMenu.cards?.map((card, i) => (
            <a
              key={`card-${i}`}
              href={card.href}
              onMouseEnter={() => setHoveredCard(`services-${i}`)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative p-6 rounded-2xl text-white transition-all duration-500 transform ${card.bgColor} flex flex-col overflow-hidden ${
                hoveredCard === `services-${i}` 
                  ? 'scale-105 shadow-2xl rotate-1' 
                  : 'hover:scale-102 hover:shadow-xl'
              }`}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated background particles */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 mb-4 text-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl group-hover:bg-white/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 flex-shrink-0">
                {card.icon}
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg mb-2 group-hover:text-white transition-colors duration-300">{card.title}</h3>
                <p className="text-sm opacity-90 group-hover:opacity-100 leading-relaxed transition-all duration-300">{card.description}</p>
              </div>
              <div className="font-semibold text-sm flex items-center opacity-80 group-hover:opacity-100 transition-all duration-300 mt-4 group-hover:translate-x-2">
                Learn more
                <span className="ml-2 transform group-hover:translate-x-2 group-hover:scale-110 transition-transform duration-300">
                  &rarr;
                </span>
              </div>
              </div>
            </a>
          ))}
        </div>
      );
    } else if (activeMenu.layout === "industries-layout") {
      content = (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          <div className="space-y-4 flex flex-col">
            {activeMenu.leftColumnCards?.map((card, i) => (
              <a
                key={`left-card-${i}`}
                href={card.href}
                onMouseEnter={() => setHoveredCard(`left-${i}`)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-5 rounded-xl text-white transition-all duration-400 transform ${card.bgColor} flex flex-col flex-1 overflow-hidden ${
                  hoveredCard === `left-${i}` 
                    ? 'scale-105 shadow-2xl -rotate-1' 
                    : 'hover:scale-102 hover:shadow-lg'
                }`}
              >
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-lg group-hover:scale-150 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500"></div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 text-2xl text-white flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl group-hover:bg-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400">
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base mb-1 group-hover:text-white transition-colors duration-300">{card.title}</h3>
                    <p className="text-sm text-white/80 group-hover:text-white/90 transition-colors duration-300">{card.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="space-y-4 flex flex-col">
            {activeMenu.middleColumnCards?.map((card, i) => (
              <a
                key={`middle-card-${i}`}
                href={card.href}
                onMouseEnter={() => setHoveredCard(`middle-${i}`)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-5 rounded-xl text-white transition-all duration-400 transform ${card.bgColor} flex flex-col flex-1 overflow-hidden ${
                  hoveredCard === `middle-${i}` 
                    ? 'scale-105 shadow-2xl rotate-1' 
                    : 'hover:scale-102 hover:shadow-lg'
                }`}
              >
                {/* Different background pattern for middle column */}
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full blur-md group-hover:scale-200 transition-transform duration-600"></div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/5 rounded-full blur-sm group-hover:scale-150 transition-transform duration-400"></div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 text-2xl text-white flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl group-hover:bg-white/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-400">
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base mb-1 group-hover:text-white transition-colors duration-300">{card.title}</h3>
                    <p className="text-sm text-white/80 group-hover:text-white/90 transition-colors duration-300">{card.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="space-y-4 flex flex-col">
            {activeMenu.rightColumnCards?.map((card, i) => (
              <a
                key={`right-card-${i}`}
                href={card.href}
                onMouseEnter={() => setHoveredCard(`right-${i}`)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-5 rounded-xl text-white transition-all duration-400 transform ${card.bgColor} flex flex-col flex-1 overflow-hidden ${
                  hoveredCard === `right-${i}` 
                    ? 'scale-105 shadow-2xl rotate-2' 
                    : 'hover:scale-102 hover:shadow-lg'
                }`}
              >
                {/* Unique pattern for right column */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-transparent group-hover:h-2 transition-all duration-500"></div>
                <div className="absolute -top-3 -right-3 w-14 h-14 bg-white/10 rounded-full blur-lg group-hover:scale-125 group-hover:rotate-45 transition-all duration-500"></div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 text-2xl text-white flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl group-hover:bg-white/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-400">
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base mb-1 group-hover:text-white transition-colors duration-300">{card.title}</h3>
                    <p className="text-sm text-white/80 group-hover:text-white/90 transition-colors duration-300">{card.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      );
    } else {
      // Default layout untuk mega-menu lainnya
      content = (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {activeMenu.cards?.map((card, i) => (
            <a
              key={`card-${i}`}
              href={card.href}
              onMouseEnter={() => setHoveredCard(`default-${i}`)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative p-6 rounded-2xl text-white transition-all duration-500 transform ${card.bgColor} flex flex-col overflow-hidden ${
                hoveredCard === `default-${i}` 
                  ? 'scale-105 shadow-2xl -rotate-1' 
                  : 'hover:scale-102 hover:shadow-xl'
              }`}
            >
              {/* Enhanced background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-14 h-14 text-2xl text-white flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-2xl group-hover:bg-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10">
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0 relative z-10">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-white transition-colors duration-300">{card.title}</h3>
                  <p className="text-sm text-white/80 group-hover:text-white/90 leading-relaxed transition-colors duration-300">{card.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
          <div className="lg:col-span-3">{content}</div>
          <div className="lg:col-span-1 flex flex-col">
            <div className="sticky top-8 p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 rounded-3xl shadow-xl border border-gray-100/50 h-full flex flex-col backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
              <h3 className="font-bold text-xl text-gray-900 mb-6 relative z-10">
                {activeMenu.whatsNew?.title}
              </h3>
              <ul className="space-y-4 mb-8 flex-grow relative z-10">
                {activeMenu.whatsNew?.items.map((item, i) => (
                  <li key={`new-${i}`} className="flex items-start space-x-3 group cursor-pointer">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 group-hover:bg-purple-500 transition-all duration-300"></div>
                    <span className="text-gray-700 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={activeMenu.whatsNew?.buttonHref}
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-4 rounded-2xl text-sm transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 mt-auto relative z-10 group overflow-hidden"
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
            <nav className="hidden lg:flex items-center justify-center space-x-1">
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
          className="absolute left-0 w-full top-full z-40 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100/50 h-[480px] rounded-b-3xl overflow-hidden"
          onMouseEnter={keepMegaMenuOpen}
          onMouseLeave={hideMegaMenu}
        >
          {/* Enhanced background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/80"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-100/20 to-pink-100/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
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
              <nav className="space-y-8">
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
                        <h3 className="text-xl font-bold text-gray-900">
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
                                  className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center text-white text-xl`}
                                >
                                  {card.icon}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">
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
                    );
                  } else if (item.type === "dropdown") {
                    return (
                      <div key={idx} className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center">
                          {item.icon && (
                            <span className="mr-2">{item.icon}</span>
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
