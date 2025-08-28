import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/member2.jpeg",
    w: "w-[30vw] md:w-[20vw]",
    h: "h-[20vh] md:h-[45vh]",
    align: "items-end",
  }, // kiri
  {
    src: "/member1.jpeg",
    w: "w-[40vw] md:w-[30vw]",
    h: "h-[30vh] md:h-[65vh]",
    align: "items-start",
  }, // kanan
];

const OurTeam = () => {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin section biar background stay
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%", // panjang scroll
        pin: true,
      });

      // animasi tiap gambar
      imagesRef.current.forEach((img, i) => {
        gsap.fromTo(
          img,
          { y: "100vh", scale: 1 },
          {
            y: "-100vh",
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=300%", // sinkron dengan pin
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen md:mb-20 flex items-center bg-white py-24 md:py-28 overflow-hidden"
    >
      {/* Background tetap */}
      <div className="container mx-auto px-4 relative z-10">
        <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-blue-500 mb-10 text-center">
          [ Kenali para pemainnya ]
        </p>
        <div className="text-center">
          <div className="mb-6">
            <span className="text-xl md:text-2xl font-extrabold text-black font-anta">
              The
            </span>
            <span className="text-xl md:text-2xl font-extrabold text-black font-space-grotesk">
              Code
            </span>
            <span className="text-xl md:text-2xl font-bold text-blue-500 font-raleway">
              Lab
            </span>
          </div>
          <h2 className="font-anton tracking-tightest leading-none text-[18vw] md:text-[9rem] lg:text-[12rem]">
            LINEUP KAMI
          </h2>
        </div>
        <div className="text-center mt-14 mb-10">
          <p className="text-blue-700 font-semibold text-2xl">
            Panggilan untuk Semua Freelancer
          </p>
          <p className="text-gray-900 text-2xl font-medium">
            Bergabunglah dengan Kami
          </p>
          <p className="text-[10px] text-gray-500 mt-4">
            Kami ingin mendengar dari Anda.{" "}
            <span className="text-blue-600">[ Ayo mulai ]</span>
          </p>
        </div>
      </div>

      {/* Images muncul dari bawah */}
      <div className="absolute inset-0 flex items-center justify-between px-8 md:px-48 z-20">
        {images.map((img, i) => (
          <div key={i} className={`${img.w} ${img.h} flex ${img.align}`}>
            <img
              alt={`Anggota-${i}`}
              ref={(el) => (imagesRef.current[i] = el)}
              src={img.src}
              className="w-full h-full object-cover shadow-lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
