import React from 'react';

const BadgeCourseComplete = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="title"
    role="img"
  >
    <title id="title">Lencana Kursus Selesai</title>
    <path
      fill="#FFD700"
      stroke="#B8860B"
      strokeWidth="5"
      d="M100,10 L120,65 L180,75 L140,115 L150,175 L100,145 L50,175 L60,115 L20,75 L80,65 Z"
    />
    <g transform="translate(65, 70)">
      <path
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 35 L35 50 L70 15"
      />
    </g>
  </svg>
);

export default BadgeCourseComplete;
