import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Header = () => {
  const [dropdowns, setDropdowns] = useState({
    services: false,
  });

  const headerRef = useRef(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(headerRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.5 }
    );

    tl.fromTo('.nav-link', 
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
      "-=1"
    );

    tl.fromTo('.auth-buttons > *', 
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
      "-=1"
    );
  }, []);

  const toggleDropdown = (menu) => {
    setDropdowns(prev => ({
      services: false,
      [menu]: !prev[menu]
    }));
  };

  const closeAllDropdowns = () => {
    setDropdowns({
      services: false,
    });
  };

  return (
    <header ref={headerRef} className="w-full bg-white relative opacity-0">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-black nav-link">
            Bilcode
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8 relative">
            <a href="#home" className="text-black hover:text-gray-600 transition-colors font-medium text-base nav-link">
              Home
            </a>
            {/* Services Dropdown */}
            <div className="relative nav-link">
              <button 
                onClick={() => toggleDropdown('services')}
                className="text-black hover:text-gray-600 transition-colors font-medium text-base flex items-center"
              >
                Services
              </button>
              {dropdowns.services && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <a href="#web-development" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Web Development</a>
                  <a href="#mobile-app-development" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Mobile App Development</a>
                  <a href="#ui-ux-design" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">UI/UX Design</a>
                  <a href="#ai-integration" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">AI Integration</a>
                </div>
              )}
            </div>
            <a href="#portfolio" className="text-black hover:text-gray-600 transition-colors font-medium text-base nav-link">
              Portfolio
            </a>
            <a href="#about" className="text-black hover:text-gray-600 transition-colors font-medium text-base nav-link">
              About
            </a>
            <a href="#team" className="text-black hover:text-gray-600 transition-colors font-medium text-base nav-link">
              Team
            </a>
            <a href="#blog" className="text-black hover:text-gray-600 transition-colors font-medium text-base nav-link">
              Blog
            </a>
            <a href="#contact" className="text-black hover:text-gray-600 transition-colors font-medium text-base nav-link">
              Contact
            </a>
          </nav>
          
          {/* Right side buttons */}
          <div className="flex items-center gap-6 auth-buttons">
            <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors font-medium text-base">
              Get a Quote
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay to close dropdowns */}
      {dropdowns.services && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeAllDropdowns}
        ></div>
      )}
    </header>
  );
};

export default Header;
