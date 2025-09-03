import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, className = '' }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        let starClass = 'text-gray-300';
        if (starValue <= fullStars) {
          starClass = 'text-yellow-400';
        } else if (hasHalfStar && starValue === fullStars + 1) {
          return (
            <div key={index} className="relative">
              <Star className="w-5 h-5 text-gray-300 fill-current" />
              <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
            </div>
          );
        }

        return (
          <Star key={index} className={`w-5 h-5 ${starClass} fill-current`} />
        );
      })}
    </div>
  );
};

export default StarRating;