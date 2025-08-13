// Our Team hero — no cards, pixel-style to reference


const OurTeam = () => {

  return (
    <section className="relative min-h-screen bg-white py-24 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center">
          <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-orange-500 mb-10">[ Meet the players ]</p>
          <div className="mb-6">
            <span className="text-xl md:text-2xl font-black text-black">The</span>
            <span className="text-xl md:text-2xl font-black text-black">Creative</span>
            <span className="text-xl md:text-2xl font-black text-orange-500">Club</span>
          </div>
          <h2 className="font-anton tracking-tightest leading-none text-gray-900 text-[18vw] md:text-[9rem] lg:text-[12rem]">OUR LINEUP</h2>
        </div>
        <div className="text-center mt-14 mb-10">
          <p className="text-amber-700 font-semibold">Calling all Freelancers</p>
          <p className="text-gray-900">Join The Collective</p>
          <p className="text-[10px] text-gray-500 mt-4">We'd love to hear from you. <span className="text-orange-600">[ Let's go ]</span></p>
        </div>

        {/* Team Grid dihilangkan sesuai permintaan */}
      </div>
    </section>
  );
};

export default OurTeam;
