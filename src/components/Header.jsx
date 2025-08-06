import { useState } from 'react';

const Header = () => {
  const [dropdowns, setDropdowns] = useState({
    product: false,
    customers: false,
    templates: false
  });

  const toggleDropdown = (menu) => {
    setDropdowns(prev => ({
      ...prev,
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
    <header className="w-full bg-white relative">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-3xl font-bold text-black">
            Bilcode
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-12 relative">
            {/* Product Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('product')}
                className="text-black hover:text-gray-600 transition-colors font-medium text-lg flex items-center gap-1"
              >
                Product
                <svg className={`w-4 h-4 transition-transform ${dropdowns.product ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('customers')}
                className="text-gray-400 hover:text-black transition-colors font-medium text-lg flex items-center gap-1"
              >
                Customers
                <svg className={`w-4 h-4 transition-transform ${dropdowns.customers ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('templates')}
                className="text-gray-400 hover:text-black transition-colors font-medium text-lg flex items-center gap-1"
              >
                Templates
                <svg className={`w-4 h-4 transition-transform ${dropdowns.templates ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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

            <a href="#" className="text-gray-400 hover:text-black transition-colors font-medium text-lg">
              Pricing
            </a>
          </nav>
          
          {/* Right side buttons */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-black hover:text-gray-600 transition-colors font-medium text-lg">
              Log in
            </a>
            <button className="bg-black text-white px-7 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium text-lg">
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