const FullScreenTransition = (
    {
      backgroundColor = 'bg-white',
      textColor = 'text-black',
      textSize = 'text-5xl md:text-7xl',
      zIndex = 'z-50',
      children,
      className = '',
      transitionRef,
      textRef,
      ...otherProps
    },
) => {
    return (
      <div
        ref={transitionRef}
        className={`fixed top-0 left-0 w-full h-full ${backgroundColor} ${zIndex} pointer-events-none flex items-center justify-center transition-transform duration-700 ease-in-out ${className}`}
        style={{ transform: 'translateY(100%)' }}
        {...otherProps}
      >
        {children || (
          <h2 ref={textRef} className={`${textSize} font-bold ${textColor}`}>
            {/* Text will be injected dynamically */}
          </h2>
        )}
      </div>
    );
};

FullScreenTransition.displayName = 'FullScreenTransition';

export default FullScreenTransition;
