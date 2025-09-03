import React from 'react';

const BadgeFirstStep = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="title"
    role="img"
  >
    <title id="title">Lencana Langkah Pertama</title>
    <circle cx="100" cy="100" r="90" fill="#CD7F32" stroke="#8B4513" strokeWidth="5" />
    <g transform="translate(50, 50) scale(0.5)">
      <path
        fill="#FFFFFF"
        d="M128 208v-48q0-14-9-23t-23-9H80v-48q0-14-9-23t-23-9H0V0h48q14 0 23 9t9 23v48h48q14 0 23 9t9 23v48h48q14 0 23 9t9 23v48z"
      />
    </g>
  </svg>
);

export default BadgeFirstStep;
