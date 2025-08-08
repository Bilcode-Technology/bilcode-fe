import { useRef, useState, useEffect, useCallback } from 'react';
import {
  Globe, Smartphone, Paintbrush, Cloud, CreditCard, HeartPulse, GraduationCap, Store, Landmark, Truck, Building2, 
  Folder, Rocket, ShoppingCart, BarChart3, BookOpen, Users, Briefcase, Handshake, Award, FileText, 
  Layers, Shield, PenTool, Server, BookMarked, FileSearch, Languages, ChevronDown
} from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#hero', type: 'link' },
  {
    label: 'Services',
    href: '#services',
    type: 'mega-menu',
    megaMenuContent: {
      featuredCards: [
        { icon: <Globe />, title: 'Web Development', description: 'End-to-end solutions for modern web apps.', bgColor: 'bg-blue-500', href: '#services' },
        { icon: <Smartphone />, title: 'Mobile Development', description: 'Native and cross-platform mobile apps.', bgColor: 'bg-purple-500', href: '#services' },
      ],
      smallCards: [
        { icon: <Paintbrush />, title: 'UI/UX Design', description: 'Intuitive and beautiful user interfaces.', href: '#services' },
        { icon: <Cloud />, title: 'AI & Automation', description: 'Intelligent automation for business growth.', href: '#services' },
      ],
      whatsNew: { title: 'Our Process', items: ['Discovery & Strategy', 'Design & Development', 'Testing & Deployment'], buttonText: 'All Services', buttonHref: '#services' }
    }
  },
  {
    label: 'Industries',
    type: 'mega-menu',
    megaMenuContent: {
      featuredCards: [
        { icon: <CreditCard />, title: 'Fintech', description: 'Secure solutions for modern banking.', bgColor: 'bg-green-500', href: '#' },
        { icon: <HeartPulse />, title: 'HealthTech', description: 'Innovative healthcare platforms.', bgColor: 'bg-red-500', href: '#' },
      ],
      smallCards: [
        { icon: <GraduationCap />, title: 'EdTech', description: 'Next-gen digital learning platforms.', href: '#' },
        { icon: <Store />, title: 'E-commerce', description: 'Scalable online retail solutions.', href: '#' },
        { icon: <Truck />, title: 'Logistics', description: 'Efficient supply chain optimization.', href: '#' },
        { icon: <Building2 />, title: 'Real Estate', description: 'PropTech innovations for real estate.', href: '#' },
        { icon: <Landmark />, title: 'Government', description: 'Smart public sector solutions.', href: '#' },
      ],
      whatsNew: { title: 'Industry Insights', items: ['Latest trends in Fintech', 'AI in Healthcare', 'Future of E-commerce'], buttonText: 'Explore Industries', buttonHref: '#' }
    }
  },
  {
    label: 'Portfolio',
    href: '#portfolio',
    type: 'mega-menu',
    megaMenuContent: {
      featuredCards: [
        { icon: <BarChart3 />, title: 'AI Analytics Dashboard', description: 'A data-driven dashboard for decision-making.', bgColor: 'bg-indigo-500', href: '#portfolio' },
        { icon: <ShoppingCart />, title: 'Multi-vendor Marketplace', description: 'A scalable e-commerce ecosystem.', bgColor: 'bg-sky-500', href: '#portfolio' },
      ],
      smallCards: [
        { icon: <Rocket />, title: 'Startup Solutions', description: 'Agile tech for fast-growing startups.', href: '#portfolio' },
        { icon: <Building2 />, title: 'Enterprise Platforms', description: 'Robust systems for global enterprises.', href: '#portfolio' },
        { icon: <Landmark />, title: 'Government Projects', description: 'Digital transformation for the public sector.', href: '#portfolio' },
        { icon: <Folder />, title: 'All Projects', description: 'Browse our complete showcase.', href: '#portfolio' },
      ],
      whatsNew: { title: 'Client Success', items: ['40% increase in user engagement', '25% cost reduction'], buttonText: 'Explore Portfolio', buttonHref: '#portfolio' }
    }
  },
  {
    label: 'Education',
    type: 'mega-menu',
    megaMenuContent: {
      featuredCards: [
        { icon: <GraduationCap />, title: 'Bootcamp', description: 'Intensive training for tech skills.', bgColor: 'bg-emerald-500', href: '#' },
        { icon: <BookMarked />, title: 'Workshops', description: 'Hands-on skill-building sessions.', bgColor: 'bg-yellow-500', href: '#' },
      ],
      smallCards: [
        { icon: <Users />, title: '1-on-1 Mentoring', description: 'Personalized learning with experts.', href: '#' },
        { icon: <Award />, title: 'Certification', description: 'Recognized industry credentials.', href: '#' },
        { icon: <Briefcase />, title: 'Corporate Training', description: 'Upskill your entire workforce.', href: '#' },
        { icon: <FileText />, title: 'Scholarship Program', description: 'Opportunities for aspiring talent.', href: '#' },
      ],
      whatsNew: { title: 'Upcoming Programs', items: ['AI Bootcamp', 'UI/UX Design Sprint', 'Cloud Certification Prep'], buttonText: 'All Programs', buttonHref: '#' }
    }
  },
  {
    label: 'Assisted Projects',
    type: 'mega-menu',
    megaMenuContent: {
      featuredCards: [
        { icon: <Layers />, title: 'Student Assistance', description: 'Support for academic projects.', bgColor: 'bg-pink-500', href: '#' },
        { icon: <Rocket />, title: 'MVP Build', description: 'Rapid prototype development.', bgColor: 'bg-cyan-500', href: '#' },
      ],
      smallCards: [
        { icon: <PenTool />, title: 'Final Project Mentoring', description: 'Guidance for graduation projects.', href: '#' },
        { icon: <Shield />, title: 'NDA-Secured Work', description: 'Confidential project development.', href: '#' },
        { icon: <Server />, title: 'Debug & Optimization', description: 'Improve performance and stability.', href: '#' },
      ],
      whatsNew: { title: 'Collaboration Options', items: ['Remote Mentoring', 'On-site Support', 'Prototype Testing'], buttonText: 'Get Assistance', buttonHref: '#' }
    }
  },
  {
    label: 'Resources',
    type: 'mega-menu',
    megaMenuContent: {
      featuredCards: [
        { icon: <BookOpen />, title: 'Blog', description: 'Insights and updates from our experts.', bgColor: 'bg-orange-500', href: '#' },
        { icon: <FileSearch />, title: 'Whitepapers', description: 'In-depth research and industry reports.', bgColor: 'bg-lime-500', href: '#' },
      ],
      smallCards: [
        { icon: <GraduationCap />, title: 'Tutorials', description: 'Step-by-step guides for developers.', href: '#' },
        { icon: <Users />, title: 'Community Forum', description: 'Collaborate and learn together.', href: '#' },
        { icon: <Layers />, title: 'Open Source Contributions', description: 'Our public code projects.', href: '#' },
      ],
      whatsNew: { title: 'Featured Content', items: ['Top 10 UI Trends', 'Scaling Your SaaS Globally'], buttonText: 'Explore Resources', buttonHref: '#' }
    }
  },
  { label: 'Contact', href: '#contact', type: 'link' },
  {
    label: 'Language',
    type: 'dropdown',
    items: [
      { title: 'English', href: '#' },
      { title: 'Español', href: '#' },
      { title: '日本語', href: '#' },
      { title: 'العربية', href: '#' },
      { title: 'Français', href: '#' },
    ],
    icon: <Languages />
  }
];

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

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu handlers
  const showMegaMenu = useCallback((menuContent, itemIndex) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setActiveMenu(menuContent);
    setHoveredItem(itemIndex);
    onDropdownToggle(true);
  }, [onDropdownToggle]);

  const hideMegaMenu = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setHoveredItem(null);
      onDropdownToggle(false);
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
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : '';
      return newState;
    });
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isMobileMenuOpen) {
          closeMobileMenu();
        } else if (isDropdownVisible) {
          hideMegaMenu();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, isDropdownVisible, closeMobileMenu, hideMegaMenu]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Header classes
  const getHeaderClasses = () => {
    const baseClasses = 'w-full fixed top-0 left-0 z-50 transition-all duration-300 border-b backdrop-blur-md';
    
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

    if (item.type === 'link') {
      return (
        <a
          key={index}
          href={item.href}
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
          }`}
        >
          {item.label}
        </a>
      );
    }

    if (item.type === 'mega-menu') {
      return (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => showMegaMenu(item.megaMenuContent, index)}
          onMouseLeave={hideMegaMenu}
        >
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
            aria-haspopup="true"
            aria-expanded={isActive}
          >
            {item.label}
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
          </button>
        </div>
      );
    }

    if (item.type === 'dropdown') {
      return (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
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

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area - 3 columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Featured Cards */}
              {activeMenu.featuredCards?.map((card, i) => (
                <a
                  key={`featured-${i}`}
                  href={card.href}
                  className={`group p-8 rounded-2xl text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 transform ${card.bgColor}`}
                >
                  <div className="w-14 h-14 mb-6 text-4xl flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl group-hover:bg-white/30 transition-all duration-300">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3">{card.title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed mb-6">{card.description}</p>
                  <div className="font-semibold text-sm flex items-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </div>
                </a>
              ))}

              {/* Small Cards */}
              {activeMenu.smallCards?.map((card, i) => (
                <a
                  key={`small-${i}`}
                  href={card.href}
                  className="group bg-gray-50/80 backdrop-blur-sm hover:bg-white hover:shadow-lg p-6 rounded-2xl transition-all duration-300 hover:scale-105 border border-gray-100/50"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 text-2xl text-gray-600 group-hover:text-blue-600 transition-colors duration-300 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      {card.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 group-hover:text-gray-900 mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Sidebar "What's New" - 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100/50">
              <h3 className="font-bold text-xl text-gray-900 mb-6">{activeMenu.whatsNew?.title}</h3>
              <ul className="space-y-4 mb-8">
                {activeMenu.whatsNew?.items.map((item, i) => (
                  <li key={`new-${i}`} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <a 
                href={activeMenu.whatsNew?.buttonHref} 
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                {activeMenu.whatsNew?.buttonText} 
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header 
        ref={headerRef} 
        className={getHeaderClasses()}
      >
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
                  <span className={`block w-full h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                  <span className={`block w-full h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-full h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <div
          ref={megaMenuRef}
          className={`absolute left-0 w-full top-full z-40 bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100 transition-all duration-300 ${
            isDropdownVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          onMouseEnter={keepMegaMenuOpen}
          onMouseLeave={hideMegaMenu}
        >
          {renderMegaMenu()}
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
                  if (item.type === 'link') {
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
                  } else if (item.type === 'mega-menu') {
                    return (
                      <div key={idx} className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.label}
                        </h3>
                        {item.megaMenuContent && (
                          <div className="ml-4 space-y-4">
                            {item.megaMenuContent.featuredCards?.map((card, i) => (
                              <a
                                key={`mobile-featured-${i}`}
                                href={card.href}
                                onClick={closeMobileMenu}
                                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                              >
                                <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center text-white text-xl`}>
                                  {card.icon}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{card.title}</div>
                                  <div className="text-sm text-gray-600">{card.description}</div>
                                </div>
                              </a>
                            ))}
                            {item.megaMenuContent.smallCards?.map((card, i) => (
                              <a
                                key={`mobile-small-${i}`}
                                href={card.href}
                                onClick={closeMobileMenu}
                                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                              >
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 text-xl">
                                  {card.icon}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{card.title}</div>
                                  <div className="text-sm text-gray-600">{card.description}</div>
                                </div>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  } else if (item.type === 'dropdown') {
                    return (
                      <div key={idx} className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center">
                          {item.icon && <span className="mr-2">{item.icon}</span>}
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