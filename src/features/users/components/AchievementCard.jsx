
import React from 'react';

const AchievementCard = ({ badge, unlocked }) => {
  const { Icon, name, description, points, rarity } = badge;

  const rarityClasses = {
    common: 'border-gray-300 bg-gray-100',
    uncommon: 'border-green-400 bg-green-50',
    rare: 'border-blue-500 bg-blue-50',
    epic: 'border-purple-500 bg-purple-50',
  };

  const rarityText = {
    common: 'Biasa',
    uncommon: 'Langka',
    rare: 'Sangat Langka',
    epic: 'Epik',
  }

  return (
    <div
      className={`relative border-2 rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 ${unlocked ? rarityClasses[rarity] : 'bg-gray-50 border-gray-200'}`}>
      {!unlocked && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-xl z-10"></div>
      )}

      <div className={`relative w-20 h-20 mb-3 flex items-center justify-center rounded-full ${unlocked ? 'bg-white' : 'bg-gray-200'}`}>
        <Icon className={`w-10 h-10 ${unlocked ? 'text-blue-600' : 'text-gray-400'}`} />
      </div>

      <h3 className={`font-bold text-lg ${unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
        {name}
      </h3>

      <p className={`text-sm text-gray-600 mt-1 flex-grow ${!unlocked && 'text-gray-400'}`}>
        {description}
      </p>

      <div className="mt-4 w-full flex justify-between items-center">
        <span className={`text-xs font-bold uppercase px-2 py-1 rounded-md ${unlocked ? 'bg-white' : 'bg-gray-200 text-gray-500'}`}>
          {rarityText[rarity] || 'Biasa'}
        </span>
        <span className={`font-bold text-sm ${unlocked ? 'text-yellow-500' : 'text-gray-400'}`}>
          +{points} XP
        </span>
      </div>
    </div>
  );
};

export default AchievementCard;
