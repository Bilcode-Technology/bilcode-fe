import React, { useState } from 'react';
import Header from '../components/Header';

const CardLayoutDemo = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleDropdownToggle = (visible) => {
    setIsDropdownVisible(visible);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isDropdownVisible={isDropdownVisible} 
        onDropdownToggle={handleDropdownToggle} 
      />
      
      {/* Demo Content */}
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Card Layout Demo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hover over the navigation menu items to see the improved 2-column card layout 
              with consistent spacing, equal heights, and full-width span options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Layout Features
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 2-column fixed layout</li>
                <li>• Consistent horizontal & vertical gaps</li>
                <li>• Equal height cards in same row</li>
                <li>• Full-width span for important cards</li>
                <li>• Centered content alignment</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Styling Improvements
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Uniform padding (1.5rem)</li>
                <li>• Consistent shadow effects</li>
                <li>• Professional hover animations</li>
                <li>• Vertical center alignment</li>
                <li>• Responsive design</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Test Navigation
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Services (2-column with full-width)</li>
                <li>• Portfolio (2-column with full-width)</li>
                <li>• Education (2-column with full-width)</li>
                <li>• Industries (3-column layout)</li>
                <li>• Other menus (2-column default)</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CardLayoutDemo;
