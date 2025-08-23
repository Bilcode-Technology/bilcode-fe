import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  const images = [
    {
      src: "https://picsum.photos/400/500?random=1",
      w: "w-64",
      h: "h-96",
      align: "items-end",
    }, // kiri
    {
      src: "https://picsum.photos/500/400?random=2",
      w: "w-80",
      h: "h-[28rem]",
      align: "items-start",
    }, // kanan
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white py-24 md:py-28 overflow-hidden"
    >
      {/* Background tetap */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-blue-500 mb-10">
            [ Meet the players ]
          </p>
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
            OUR LINEUP
          </h2>
        </div>
        <div className="text-center mt-14 mb-10">
          <p className="text-sky-700 font-semibold text-2xl">
            Calling all Freelancers
          </p>
          <p className="text-gray-900 text-2xl font-space-grotesk font-medium">
            Join The Lab
          </p>
          <p className="text-[10px] text-gray-500 mt-4">
            We'd love to hear from you.{" "}
            <span className="text-blue-600">[ Let's go ]</span>
          </p>
        </div>
      </div>

      {/* Images muncul dari bawah */}
      <div className="absolute inset-0 flex items-center justify-between px-48 z-20">
        {images.map((img, i) => (
          <div key={i} className={`${img.w} ${img.h} flex ${img.align}`}>
            <img
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
