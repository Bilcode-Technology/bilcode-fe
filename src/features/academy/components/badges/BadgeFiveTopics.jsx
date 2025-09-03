import React from 'react';

const BadgeFiveTopics = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="title"
    role="img"
  >
    <title id="title">Lencana 5 Topik Selesai</title>
    <circle cx="100" cy="100" r="90" fill="#C0C0C0" stroke="#A9A9A9" strokeWidth="5" />
    <text
      x="100"
      y="125"
      fontSize="80"
      fontWeight="bold"
      fill="#FFFFFF"
      textAnchor="middle"
      stroke="#333"
      strokeWidth="2"
    >
      5
    </text>
  </svg>
);

export default BadgeFiveTopics;
