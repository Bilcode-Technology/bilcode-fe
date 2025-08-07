import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Header = () => {
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
            <a href="#services" className="text-black hover:text-gray-600 transition-colors font-medium text-base nav-link">
              Services
            </a>
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
    </header>
  );
};

export default Header;
