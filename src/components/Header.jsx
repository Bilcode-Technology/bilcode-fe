import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Header = () => {
  const [dropdowns, setDropdowns] = useState({
    services: false,
    portfolio: false,
    about: false,
    blog: false,
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
      portfolio: false,
      about: false,
      blog: false,
      [menu]: !prev[menu]
    }));
  };

  const closeAllDropdowns = () => {
    setDropdowns({
      services: false,
      portfolio: false,
      about: false,
      blog: false,
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
            {/* Portfolio Dropdown */}
            <div className="relative nav-link">
              <button 
                onClick={() => toggleDropdown('portfolio')}
                className="text-black hover:text-gray-600 transition-colors font-medium text-base flex items-center"
              >
                Portfolio
              </button>
              {dropdowns.portfolio && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <a href="#all-projects" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">All Projects</a>
                  <a href="#startups" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Startups</a>
                  <a href="#government-projects" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Government Projects</a>
                  <a href="#e-commerce" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">E-commerce</a>
                  <a href="#fintech" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Fintech</a>
                  <a href="#case-studies" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Case Studies</a>
                </div>
              )}
            </div>
            {/* About Dropdown */}
            <div className="relative nav-link">
              <button 
                onClick={() => toggleDropdown('about')}
                className="text-black hover:text-gray-600 transition-colors font-medium text-base flex items-center"
              >
                About
              </button>
              {dropdowns.about && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <a href="#our-story" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Our Story</a>
                  <a href="#our-team" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Our Team</a>
                  <a href="#our-values" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Our Values</a>
                  <a href="/careers" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Culture & Career</a>
                  <a href="#testimonials" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Testimonials / Clients Say</a>
                </div>
              )}
            </div>
            {/* Blog Dropdown */}
            <div className="relative nav-link">
              <button 
                onClick={() => toggleDropdown('blog')}
                className="text-black hover:text-gray-600 transition-colors font-medium text-base flex items-center"
              >
                Blog
              </button>
              {dropdowns.blog && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <a href="#all-articles" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">All Articles</a>
                  <a href="#engineering" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Engineering</a>
                  <a href="#ui-ux-design" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">UI/UX & Design</a>
                  <a href="#devops-cloud" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">DevOps & Cloud</a>
                  <a href="#company-updates" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Company Updates</a>
                  <a href="#tutorials" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Tutorials</a>
                </div>
              )}
            </div>
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
      {(dropdowns.services || dropdowns.portfolio || dropdowns.about || dropdowns.blog) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeAllDropdowns}
        ></div>
      )}
    </header>
  );
};

export default Header;
