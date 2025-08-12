import React from 'react';

const PortfolioCard = ({ image, title, variant = 'light' }) => {
  const isDark = variant === 'dark';
  const mediaWrapper = isDark
    ? 'border-white/10 bg-white/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]'
    : 'border-gray-200 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]';

  return (
    <article className="group w-full max-w-sm flex-[0_0_320px]">
      {/* Media */}
      <div className={`relative overflow-hidden rounded-3xl border ${mediaWrapper}`}>
        <img
          src={image}
          alt={title}
          className="block w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ height: 420 }}
        />
        {/* Subtle gradient overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>


    </article>
  );
};

export default PortfolioCard;

