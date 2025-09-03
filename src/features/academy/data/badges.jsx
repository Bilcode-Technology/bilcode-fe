import React from 'react';
import BadgeFirstStep from '../components/badges/BadgeFirstStep';
import BadgeFiveTopics from '../components/badges/BadgeFiveTopics';
import BadgeCourseComplete from '../components/badges/BadgeCourseComplete';

export const badges = {
  FIRST_STEP: {
    id: 'FIRST_STEP',
    name: 'Langkah Pertama',
    description: 'Selesaikan topik pertamamu.',
    Icon: ({ className }) => <BadgeFirstStep className={className} />,
  },
  FIVE_TOPICS: {
    id: 'FIVE_TOPICS',
    name: 'Pemanasan',
    description: 'Selesaikan 5 topik.',
    Icon: ({ className }) => <BadgeFiveTopics className={className} />,
  },
  COURSE_COMPLETE: {
    id: 'COURSE_COMPLETE',
    name: 'Penamat Kursus',
    description: 'Selesaikan seluruh topik dalam sebuah kursus.',
    Icon: ({ className }) => <BadgeCourseComplete className={className} />,
  },
};

export const allBadges = Object.values(badges);
