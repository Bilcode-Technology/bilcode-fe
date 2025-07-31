const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center bg-white pb-10 text-center mt-16">
      {/* Announcement Banner */}
      <div className="bg-gray-100 px-4 py-2 rounded-full mb-2">
        <span className="text-sm text-gray-700">
          <span className="font-semibold">New:</span> Pen tool & Morphing{" "}
          <a href="#" className="text-purple-600 hover:underline">
            Learn more
          </a>
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-6xl md:text-7xl font-bold text-black leading-tight mb-8 max-w-4xl">
        Super fast motion
        <br />
        for every team
      </h1>

      {/* CTA Button */}
      <button className="bg-purple-400 hover:bg-purple-500 text-black font-semibold text-lg px-8 py-4 rounded-full mb-16">
        Try Jitter for free
      </button>

      {/* Stats Text */}
      <p className="text-gray-600 mb-12 max-w-2xl">
        Over 20,000 creative teams use{" "}
        <span className="font-semibold text-black">Jitter</span> to create
        stunning animations online.
      </p>

      {/* Company Logos */}
      <div className="flex items-center justify-center space-x-12 opacity-60">
        <div className="text-2xl font-bold">Huge</div>
        <div className="flex items-center space-x-1">
          <div className="w-6 h-6 bg-black rounded-full"></div>
          <span className="text-xl font-semibold">Spotify</span>
        </div>
        <div className="text-2xl font-bold">AKQA</div>
        <div className="text-2xl font-bold">Linktree</div>
        <div className="text-2xl font-bold">27b</div>
        <div className="text-2xl font-bold">Ogilvy</div>
      </div>
    </section>
  );
};

export default Hero;
