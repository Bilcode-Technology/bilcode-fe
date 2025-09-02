import SponsorsRotator from "../components/SponsorsRotator";
import { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { gsap } from "gsap";

const Hero = () => {
  const sponsorsRef = useRef(null);

  useEffect(() => {
    // Create a separate context for the sponsors section
    const ctx = gsap.context(() => {}, sponsorsRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen md:mb-20 flex flex-col items-center justify-center bg-white text-center">
      {/* Announcement Banner */}
      <div className="bg-gray-100 px-4 py-1 rounded-full mb-4 text-xs md:text-base md:mb-6 md:mt-[100px]">
        <span className=" text-gray-700">
          <span className="font-semibold text-[#3852F7]">Unggulan:</span> Solusi
          Web & Aplikasi End-to-End{" "}
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="font-marker text-4xl md:text-[80px] font-bold leading-tight md:leading-[70px] text-black mb-4 md:mb-8 max-w-5xl">
        Transformasi Digital & 
        <br />
        Peningkatan Skill Anda
      </h1>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4 mb-6 md:mb-16">
        <a
          href="http://wa.me/6285128004772"
          className="bg-[#3852F7] hover:scale-110 text-white font-semibold text-sm md:text-lg px-4 py-2 md:px-8 md:py-4 rounded-full cursor-pointer transition-all duration-300"
        >
          Dapatkan Konsultasi Gratis
        </a>
        <Link 
          to="/academy"
          className="border border-[#3852F7] text-[#3852F7] hover:bg-[#3852F7] hover:text-white font-semibold text-sm md:text-lg px-4 py-2 md:px-8 md:py-4 rounded-full cursor-pointer transition-all duration-300"
        >
          Jelajahi Academy
        </Link>
      </div>

      {/* Stats Text */}
      <p className="mb-8 md:mb-12 max-w-2xl">
        <span className="font-medium">
          Lebih dari 20+ klien mempercayai Bilcode
        </span>{" "}
        untuk membangun produk digital dan meningkatkan skill tim mereka.
      </p>

      {/* Sponsors Rotator with ref */}
      <div ref={sponsorsRef} className="w-full px-5 md:px-0 md:max-w-5xl">
        <SponsorsRotator
          items={[
            { name: "PLN", logo: "/logo/pln.png" },
            { name: "USAID", logo: "/logo/usaid.png" },
            { name: "Demokrat", logo: "/logo/demokrat.png" },
            { name: "Nasdem", logo: "/logo/nasdem.png" },
            { name: "IDN", logo: "/logo/idn.png" },
          ]}
          interval={1.8}
        />
      </div>
    </section>
  );
};

export default Hero;
