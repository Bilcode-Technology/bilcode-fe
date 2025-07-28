const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center p-4">
      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
        Your Vision, Our Code.
      </h1>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl">
        Transforming ideas into powerful digital solutions.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full shadow-lg">
        Get Started
      </button>
    </section>
  );
};

export default Hero;