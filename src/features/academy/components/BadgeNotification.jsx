import React, { useState, useEffect } from 'react';

const BadgeNotification = ({ badge }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (badge) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [badge]);

  if (!visible || !badge) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 bg-white border-2 border-yellow-400 shadow-lg rounded-lg p-4 flex items-center animate-bounce">
      <div className="w-16 h-16 mr-4">
        <badge.Icon className="w-full h-full" />
      </div>
      <div>
        <h4 className="font-bold text-lg text-gray-900">Lencana Diperoleh!</h4>
        <p className="text-gray-700">{badge.name}</p>
      </div>
    </div>
  );
};

export default BadgeNotification;
