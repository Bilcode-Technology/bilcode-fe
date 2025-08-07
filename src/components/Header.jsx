import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Header = () => {
  const [dropdowns, setDropdowns] = useState({
    product: false,
    customers: false,
    templates: false
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
      product: false,
      customers: false,
      templates: false,
      [menu]: !prev[menu]
    }));
  };

  const closeAllDropdowns = () => {
    setDropdowns({
      product: false,
      customers: false,
      templates: false
    });
  };

  return (
    <header ref={headerRef} className="w-full bg-white relative opacity-0">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-black nav-link">
            Jitter
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {/* Product Dropdown */}
            <div className="relative nav-link">
              <button 
                onClick={() => toggleDropdown('product')}
                className="text-black hover:text-gray-600 transition-colors font-medium text-base flex items-center"
              >
                Product
              </button>
              {dropdowns.product && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Features</a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Integrations</a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">API</a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Desktop App</a>
                </div>
              )}
            </div>

            {/* Customers Dropdown */}
            <div className="relative nav-link">
              <button 
                onClick={() => toggleDropdown('customers')}
                className="text-gray-500 hover:text-black transition-colors font-medium text-base flex items-center"
              >
                Customers
              </button>
              {dropdowns.customers && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Creative Teams</a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Agencies</a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Studios</a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Case Studies</a>
                </div>
              )}
            </div>

            {/* Templates Dropdown */}
            <div className="relative nav-link">
              <button 
                onClick={() => toggleDropdown('templates')}
                className="text-gray-500 hover:text-black transition-colors font-medium text-base flex items-center"
              >
                Templates
              </button>
              {dropdowns.templates && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Animation Templates</a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Logo Animations</a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Social Media</a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black">Presentations</a>
                </div>
              )}
            </div>

            <a href="#" className="text-gray-500 hover:text-black transition-colors font-medium text-base nav-link">
              Pricing
            </a>
          </nav>
          
          {/* Right side buttons */}
          <div className="flex items-center gap-6 auth-buttons">
            <a href="#" className="text-black hover:text-gray-600 transition-colors font-medium text-base">
              Log in
            </a>
            <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors font-medium text-base">
              Try for free
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay to close dropdowns */}
      {(dropdowns.product || dropdowns.customers || dropdowns.templates) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeAllDropdowns}
        ></div>
      )}
    </header>
  );
};

export default Header;
