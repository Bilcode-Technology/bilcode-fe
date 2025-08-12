import React from 'react';

const PortfolioCard = ({ image, video, partnerLabel, title, subtitle, tag, variant = 'light' }) => {
  const isDark = variant === 'dark';
  const mediaWrapper = isDark
    ? 'border-white/10 bg-white/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]'
    : 'border-gray-200 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]';
  const labelClass = isDark ? 'text-white/60' : 'text-gray-500';
  const titleClass = isDark ? 'text-white' : 'text-gray-900';
  const subClass = isDark ? 'text-white/80' : 'text-gray-700';
  const tagClass = isDark ? 'text-white/60' : 'text-gray-500';

  return (
    <article className="group w-full max-w-sm">
      {/* Media 9:16 */}
      <div className={`relative overflow-hidden rounded-3xl border ${mediaWrapper} aspect-[9/16]` }>
        {video ? (
          <video
            src={video}
            className="w-full h-full object-cover"
            muted
            playsInline
            autoPlay
            loop
            poster={image}
          />
        ) : (
          <img
            src={image}
            alt={title}
            className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        {/* Subtle gradient overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Text block */}
      <div className="mt-4 px-1 select-none">
        {partnerLabel && (
          <div className={`text-[10px] tracking-widest ${labelClass} uppercase mb-2`}>
            {partnerLabel}
          </div>
        )}

        <h3 className={`${titleClass} text-lg sm:text-xl font-extrabold leading-snug`}>
          {title}
          {subtitle && (
            <span className={`ml-1 ${subClass}`}> {subtitle}</span>
          )}
        </h3>

        {tag && (
          <div className={`mt-2 text-xs ${tagClass}`}>{tag}</div>
        )}
      </div>
    </article>
  );
};

export default PortfolioCard;

