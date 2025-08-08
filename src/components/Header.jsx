import { useRef, useState, useEffect, useCallback } from 'react';
import {
  Globe, Smartphone, Paintbrush, Cloud, CreditCard, HeartPulse, GraduationCap, Store, Landmark, Truck, Building2, 
  Folder, Rocket, ShoppingCart, BarChart3, BookOpen, Users, Briefcase, Handshake, Award, FileText, 
  Layers, Shield, PenTool, Server, BookMarked, FileSearch, Languages, ChevronDown, Plane, Building, Code, 
  Palette, LayoutTemplate, Library, Phone, Calendar, FileQuestion, MapPin, Mail
} from 'lucide-react';

const navItems = [
  {
    label: 'Services',
    type: 'mega-menu',
    megaMenuContent: {
      layout: 'services-layout',
      cards: [
        { icon: <Globe />, title: 'Web Development', description: 'End-to-end solutions for modern web apps.', bgColor: 'bg-blue-500', href: '#services' },
        { icon: <Smartphone />, title: 'Mobile App Development', description: 'Native and cross-platform mobile apps.', bgColor: 'bg-purple-500', href: '#services' },
        { icon: <Paintbrush />, title: 'UI/UX Design', description: 'Intuitive and beautiful user interfaces.', bgColor: 'bg-teal-500', href: '#services' },
        { icon: <Cloud />, title: 'AI & Automation', description: 'Intelligent automation for business growth.', bgColor: 'bg-sky-500', href: '#services' },
      ],
      whatsNew: { title: 'Our Process', items: ['Discovery & Strategy', 'Design & Development', 'Testing & Deployment'], buttonText: 'All Services', buttonHref: '#services' }
    }
  },
  {
    label: 'Industries',
    type: 'mega-menu',
    megaMenuContent: {
      layout: 'industries-layout',
      leftColumnCards: [
        { icon: <CreditCard />, title: 'Fintech', description: 'Secure solutions for modern banking.', href: '#', bgColor: 'bg-green-500' },
        { icon: <HeartPulse />, title: 'HealthTech', description: 'Innovative healthcare platforms.', href: '#', bgColor: 'bg-red-500' },
        { icon: <GraduationCap />, title: 'EdTech', description: 'Next-gen digital learning platforms.', href: '#', bgColor: 'bg-yellow-500' },
      ],
      middleColumnCards: [
        { icon: <Store />, title: 'E-commerce', description: 'Scalable online retail solutions.', href: '#', bgColor: 'bg-indigo-500' },
        { icon: <Landmark />, title: 'Government', description: 'Smart public sector solutions.', href: '#', bgColor: 'bg-orange-500' },
        { icon: <Truck />, title: 'Logistics', description: 'Efficient supply chain optimization.', href: '#', bgColor: 'bg-pink-500' },
      ],
      rightColumnCards: [
        { icon: <Building2 />, title: 'Real Estate', description: 'PropTech innovations for real estate.', href: '#', bgColor: 'bg-cyan-500' },
      ],
      whatsNew: { title: 'Industry Insights', items: ['Latest trends in Fintech', 'AI in Healthcare', 'Future of E-commerce'], buttonText: 'Explore Industries', buttonHref: '#' }
    }
  },
  {
    label: 'Portfolio',
    type: 'mega-menu',
    megaMenuContent: {
      cards: [
        { icon: <Folder />, title: 'All Projects', description: 'Browse our complete showcase.', bgColor: 'bg-purple-500', href: '#portfolio' },
        { icon: <Rocket />, title: 'Startups', description: 'Agile tech for fast-growing startups.', bgColor: 'bg-red-500', href: '#portfolio' },
        { icon: <ShoppingCart />, title: 'E-commerce', description: 'A scalable e-commerce ecosystem.', bgColor: 'bg-sky-500', href: '#portfolio' },
        { icon: <Server />, title: 'SaaS Platforms', description: 'Software as a Service solutions.', bgColor: 'bg-green-500', href: '#portfolio' },
        { icon: <Building />, title: 'Enterprise Solutions', description: 'Robust systems for global enterprises.', bgColor: 'bg-yellow-500', href: '#portfolio' },
        { icon: <FileText />, title: 'Case Studies', description: 'In-depth project analysis.', bgColor: 'bg-indigo-500', href: '#portfolio' },
      ],
      whatsNew: { title: 'Client Success', items: ['40% increase in user engagement', '25% cost reduction'], buttonText: 'Explore Portfolio', buttonHref: '#portfolio' }
    }
  },
  {
    label: 'About',
    type: 'mega-menu',
    megaMenuContent: {
      cards: [
        { icon: <BookOpen />, title: 'Our Story', description: 'The journey of our company.', bgColor: 'bg-blue-500', href: '#' },
        { icon: <Users />, title: 'Our Team', description: 'Meet the people behind our success.', bgColor: 'bg-purple-500', href: '#' },
        { icon: <Briefcase />, title: 'Careers', description: 'Join our talented team.', bgColor: 'bg-teal-500', href: '#' },
        { icon: <Handshake />, title: 'Partnerships', description: 'Our trusted collaborators.', bgColor: 'bg-sky-500', href: '#' },
        { icon: <Award />, title: 'Certifications', description: 'Our recognized credentials.', bgColor: 'bg-green-500', href: '#' },
        { icon: <FileSearch />, title: 'Testimonials', description: 'What our clients say about us.', bgColor: 'bg-red-500', href: '#' },
      ],
      whatsNew: { title: 'Company News', items: ['We are expanding to a new office!', 'New partnership announcement.'], buttonText: 'Read More', buttonHref: '#' }
    }
  },
  {
    label: 'Education',
    type: 'mega-menu',
    megaMenuContent: {
      cards: [
        { icon: <GraduationCap />, title: 'Bootcamp', description: 'Intensive training for tech skills.', bgColor: 'bg-emerald-500', href: '#' },
        { icon: <BookMarked />, title: 'Workshops', description: 'Hands-on skill-building sessions.', bgColor: 'bg-yellow-500', href: '#' },
        { icon: <Users />, title: '1-on-1 Mentoring', description: 'Personalized learning with experts.', bgColor: 'bg-indigo-500', href: '#' },
        { icon: <Award />, title: 'Certification', description: 'Recognized industry credentials.', bgColor: 'bg-pink-500', href: '#' },
        { icon: <Briefcase />, title: 'Corporate Training', description: 'Upskill your entire workforce.', bgColor: 'bg-cyan-500', href: '#' },
        { icon: <FileText />, title: 'Scholarship Program', description: 'Opportunities for aspiring talent.', bgColor: 'bg-orange-500', href: '#' },
      ],
      whatsNew: { title: 'Upcoming Programs', items: ['AI Bootcamp', 'UI/UX Design Sprint', 'Cloud Certification Prep'], buttonText: 'All Programs', buttonHref: '#' }
    }
  },
  {
    label: 'Assisted Projects',
    type: 'mega-menu',
    megaMenuContent: {
      cards: [
        { icon: <Layers />, title: 'Student Assistance', description: 'Support for academic projects.', bgColor: 'bg-pink-500', href: '#' },
        { icon: <PenTool />, title: 'Final Project Mentoring', description: 'Guidance for graduation projects.', bgColor: 'bg-cyan-500', href: '#' },
        { icon: <Rocket />, title: 'MVP Build', description: 'Rapid prototype development.', bgColor: 'bg-red-500', href: '#' },
        { icon: <Shield />, title: 'NDA-Secured Work', description: 'Confidential project development.', bgColor: 'bg-teal-500', href: '#' },
        { icon: <Server />, title: 'Debug & Optimization', description: 'Improve performance and stability.', bgColor: 'bg-sky-500', href: '#' },
      ],
      whatsNew: { title: 'Collaboration Options', items: ['Remote Mentoring', 'On-site Support', 'Prototype Testing'], buttonText: 'Get Assistance', buttonHref: '#' }
    }
  },
  {
    label: 'Template Store',
    type: 'mega-menu',
    megaMenuContent: {
      cards: [
        { icon: <LayoutTemplate />, title: 'Website Templates', description: 'Ready-to-use website designs.', bgColor: 'bg-blue-500', href: '#' },
        { icon: <Palette />, title: 'Mobile UI Kits', description: 'Complete UI kits for mobile apps.', bgColor: 'bg-purple-500', href: '#' },
        { icon: <BarChart3 />, title: 'Dashboard Templates', description: 'Pre-built dashboard designs.', bgColor: 'bg-teal-500', href: '#' },
        { icon: <Library />, title: 'Component Libraries', description: 'Reusable UI components.', bgColor: 'bg-sky-500', href: '#' },
        { icon: <Code />, title: 'Landing Page Kits', description: 'Kits for creating landing pages.', bgColor: 'bg-green-500', href: '#' },
      ],
      whatsNew: { title: 'New Arrivals', items: ['New dashboard template released', 'Mobile UI kit updated'], buttonText: 'Browse Store', buttonHref: '#' }
    }
  },
  {
    label: 'Resources',
    type: 'mega-menu',
    megaMenuContent: {
      cards: [
        { icon: <BookOpen />, title: 'Blog', description: 'Insights and updates from our experts.', bgColor: 'bg-orange-500', href: '#' },
        { icon: <FileSearch />, title: 'Whitepapers', description: 'In-depth research and industry reports.', bgColor: 'bg-lime-500', href: '#' },
        { icon: <GraduationCap />, title: 'Tutorials', description: 'Step-by-step guides for developers.', bgColor: 'bg-yellow-500', href: '#' },
        { icon: <FileText />, title: 'Research Reports', description: 'Our latest research findings.', bgColor: 'bg-indigo-500', href: '#' },
        { icon: <Users />, title: 'Community Forum', description: 'Collaborate and learn together.', bgColor: 'bg-pink-500', href: '#' },
        { icon: <Layers />, title: 'Open Source Contributions', description: 'Our public code projects.', bgColor: 'bg-cyan-500', href: '#' },
      ],
      whatsNew: { title: 'Featured Content', items: ['Top 10 UI Trends', 'Scaling Your SaaS Globally'], buttonText: 'Explore Resources', buttonHref: '#' }
    }
  },
  {
    label: 'Contact',
    type: 'mega-menu',
    megaMenuContent: {
      cards: [
        { icon: <Mail />, title: 'Contact Form', description: 'Send us a message.', bgColor: 'bg-blue-500', href: '#' },
        { icon: <Calendar />, title: 'Schedule Call', description: 'Book a meeting with us.', bgColor: 'bg-purple-500', href: '#' },
        { icon: <FileQuestion />, title: 'Request Quote', description: 'Get a quote for your project.', bgColor: 'bg-teal-500', href: '#' },
        { icon: <MapPin />, title: 'Office Location', description: 'Find our office on the map.', bgColor: 'bg-sky-500', href: '#' },
        { icon: <Building />, title: 'Regional Offices', description: 'Our offices around the world.', bgColor: 'bg-green-500', href: '#' },
      ],
      whatsNew: { title: 'Get in Touch', items: ['We are available 24/7', 'Response within 24 hours'], buttonText: 'Contact Us', buttonHref: '#' }
    }
  },
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

    let content = null;

    if (activeMenu.layout === 'services-layout') {
      content = (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {activeMenu.cards?.map((card, i) => (
            <a key={`card-${i}`} href={card.href} className={`group p-5 rounded-xl text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 transform ${card.bgColor} flex flex-col`}>
              <div className="w-10 h-10 mb-3 text-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 transition-all duration-300 flex-shrink-0">{card.icon}</div>
              <div className="flex-grow">
                <h3 className="font-semibold text-md mb-1">{card.title}</h3>
                <p className="text-xs opacity-90">{card.description}</p>
              </div>
              <div className="font-medium text-xs flex items-center opacity-80 group-hover:opacity-100 transition-opacity duration-300 mt-3">Learn more <span className="ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span></div>
            </a>
          ))}
        </div>
      );
    } else if (activeMenu.layout === 'industries-layout') {
      content = (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          <div className="space-y-4 flex flex-col">
            {activeMenu.leftColumnCards?.map((card, i) => (
              <a key={`left-card-${i}`} href={card.href} className={`group p-4 rounded-xl text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 transform ${card.bgColor} flex flex-col flex-1`}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 text-2xl text-white flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 transition-all duration-300">{card.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-md mb-1">{card.title}</h3>
                    <p className="text-xs text-white/80">{card.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="space-y-4 flex flex-col">
            {activeMenu.middleColumnCards?.map((card, i) => (
              <a key={`middle-card-${i}`} href={card.href} className={`group p-4 rounded-xl text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 transform ${card.bgColor} flex flex-col flex-1`}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 text-2xl text-white flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 transition-all duration-300">{card.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-md mb-1">{card.title}</h3>
                    <p className="text-xs text-white/80">{card.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="space-y-4 flex flex-col">
            {activeMenu.rightColumnCards?.map((card, i) => (
              <a key={`right-card-${i}`} href={card.href} className={`group p-4 rounded-xl text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 transform ${card.bgColor} flex flex-col flex-1`}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 text-2xl text-white flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 transition-all duration-300">{card.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-md mb-1">{card.title}</h3>
                    <p className="text-xs text-white/80">{card.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      );
    } else {
      // Default layout for other mega-menus
      content = (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {activeMenu.cards?.map((card, i) => (
            <a key={`card-${i}`} href={card.href} className={`group p-4 rounded-xl text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 transform ${card.bgColor} flex flex-col`}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 text-2xl text-white flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 transition-all duration-300">{card.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-md mb-1">{card.title}</h3>
                  <p className="text-xs text-white/80">{card.description}</p>
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
            <div className="sticky top-8 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100/50 h-full flex flex-col">
              <h3 className="font-bold text-xl text-gray-900 mb-6">{activeMenu.whatsNew?.title}</h3>
              <ul className="space-y-4 mb-8 flex-grow">
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
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg mt-auto"
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
          className={`absolute left-0 w-full top-full z-40 bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100 transition-all duration-300 h-[480px] rounded-b-3xl ${
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
                            {item.megaMenuContent.cards?.map((card, i) => (
                              <a
                                key={`mobile-card-${i}`}
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