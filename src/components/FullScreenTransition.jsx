import React, { forwardRef } from 'react';

const FullScreenTransition = forwardRef((props, ref) => {
  // Use object destructuring for cleaner access to refs
  const { transitionRef, textRef } = ref;

  return (
    <div 
      ref={transitionRef}
      className="fixed top-0 left-0 w-full h-full bg-white z-50 pointer-events-none flex items-center justify-center"
      // Start hidden off-screen (bottom)
      style={{ transform: 'translateY(100%)' }} 
    >
      <h2 ref={textRef} className="text-5xl md:text-7xl font-bold text-black opacity-0">
        {/* Section name will be injected by GSAP */}
      </h2>
    </div>
  );
});

FullScreenTransition.displayName = 'FullScreenTransition';

export default FullScreenTransition;
