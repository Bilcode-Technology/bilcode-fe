const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center bg-white pb-10 text-center mt-16">
      {/* Announcement Banner */}
      <div className="bg-gray-100 px-4 py-1 rounded-full mb-6">
        <span className=" text-gray-700">
          <span className="font-semibold">Featured:</span> End-to-End Web & App
          Solutions{" "}
          <a href="#" className="text-purple-600 hover:underline font-medium">
            Learn more
          </a>
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-6xl md:text-[80px] font-bold leading-[70px] text-black mb-8 max-w-4xl">
        Fast & Reliable Solutions
        <br />
        for Your Business
      </h1>

      {/* CTA Button */}
      <button className="bg-purple-400 hover:bg-purple-500 text-black font-semibold text-lg px-8 py-4 rounded-full mb-16">
        Get a Free Consultation
      </button>

      {/* Stats Text */}
      <p className=" mb-12 max-w-2xl">
        <span className="font-medium">
          Over 20+ clients trust Bilcode Technology
        </span>{" "}
        to build their digital products.
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
