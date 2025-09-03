
import React from 'react';
import { db } from '../../academy/api';
import AchievementCard from '../components/AchievementCard';

const BadgesPage = () => {
  // In a real app, this would come from the user's profile
  const userBadges = ['FIRST_STEP', 'FIVE_TOPICS', 'COURSE_COMPLETE', 'STREAK_7'];
  const allBadges = Object.values(db.BADGES);

  const unlockedBadges = allBadges.filter(badge => userBadges.includes(badge.id));
  const lockedBadges = allBadges.filter(badge => !userBadges.includes(badge.id));

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Pencapaian Saya
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Kumpulkan semua lencana dengan menyelesaikan tantangan dan tunjukkan keahlian Anda.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lencana Didapat ({unlockedBadges.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {unlockedBadges.map(badge => (
              <AchievementCard key={badge.id} badge={badge} unlocked={true} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lencana Terkunci ({lockedBadges.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {lockedBadges.map(badge => (
              <AchievementCard key={badge.id} badge={badge} unlocked={false} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BadgesPage;
