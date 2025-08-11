const OurTeam = () => {
  return (
    <section className="min-h-[90vh] bg-gray-100 py-16 md:py-24 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        {/* Header */}
        <div className="mb-16">
          <p className="text-orange-500 text-sm uppercase tracking-wide mb-8">
            [ Meet the players ]
          </p>

          {/* Logo */}
          <div className="mb-8">
            <span className="text-2xl font-bold text-black">The</span>
            <span className="text-2xl font-bold text-orange-500">Creative</span>
            <span className="text-2xl font-bold text-orange-500">Club</span>
          </div>

          {/* Main Title */}
          <h2 className="text-8xl md:text-9xl font-black text-gray-900 leading-none mb-16">
            OUR LINEUP
          </h2>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end max-w-6xl mx-auto">
          {/* Left Side - Call to Action */}
          <div className="text-left">
            <h3 className="text-orange-500 text-2xl font-semibold mb-2">
              Calling all Freelancers
            </h3>
            <p className="text-black text-xl font-medium mb-4">
              Join The Collective
            </p>
            <p className="text-gray-600 text-sm max-w-xs">
              Want to join our global network of specialists?
              <br />
              We'd love to hear from you. Let's go!
            </p>
          </div>

          {/* Right Side - Join Us Badge */}
          <div className="transform -rotate-12">
            <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
              <span className="font-bold text-lg">JOIN US</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
