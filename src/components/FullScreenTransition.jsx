import { forwardRef } from 'react';

const FullScreenTransition = forwardRef((props, ref) => {
  const {
    backgroundColor = 'bg-white',
    textColor = 'text-black',
    textSize = 'text-5xl md:text-7xl',
    zIndex = 'z-50',
    children,
    className = '',
    ...otherProps
  } = props;

  // Use object destructuring for cleaner access to refs
  const { transitionRef, textRef } = ref;

  return (
    <div
      ref={transitionRef}
      className={`fixed top-0 left-0 w-full h-full ${backgroundColor} ${zIndex} pointer-events-none flex items-center justify-center ${className}`}
      style={{ transform: 'translateY(100%)' }}
      {...otherProps}
    >
      {children || (
        <h2 ref={textRef} className={`${textSize} font-bold ${textColor}`}>
          {/* Content will be injected by animation logic */}
        </h2>
      )}
    </div>
  );
});

FullScreenTransition.displayName = 'FullScreenTransition';

export default FullScreenTransition;
