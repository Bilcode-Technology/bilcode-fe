import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const portfolioSlides = [
  {
    image: "/portfolio/Macbook Pro - Carbon Trade.jpg",
    alt: "Carbon Trade Project",
    title: "Djangjo - Carbon Trade",
    description:
      "Platform perdagangan karbon berbasis digital untuk mendukung masa depan hijau dan berkelanjutan.",
  },
  {
    image: "/portfolio/Macbook Pro - Kandidatpro.jpg",
    alt: "Kandidat Pro Project",
    title: "Kandidat Pro",
    description:
      "Solusi rekrutmen digital modern yang mempertemukan perusahaan dengan profesional IT terbaik.",
  },
  {
    image: "/portfolio/Macbook Pro - PLN.jpg",
    alt: "PLN Project",
    title: "PLN - Strategic Navigation Flighdeck",
    description:
      "Sistem navigasi cerdas yang dirancang untuk meningkatkan efisiensi armada PLN secara menyeluruh.",
  },
  {
    image: "/portfolio/Macbook Pro - Govita.jpg",
    alt: "Travel Project",
    title: "Govita Handling Travel",
    description:
      "Platform pemesanan travel premium dengan layanan handal untuk perjalanan nyaman dan terpercaya.",
  },
  {
    image: "/portfolio/Macbook Pro - Kuliatul.jpg",
    alt: "Kuliatul Haram University Project",
    title: "Kuliatul Haram University",
    description:
      "Portal akademik digital yang modern untuk mendukung sistem pendidikan Islam berkelas dunia.",
  },
  {
    image: "/portfolio/Macbook Pro - Qurbanku.jpg",
    alt: "Qurbanku Project",
    title: "Qurbanku",
    description:
      "Platform digital qurban terpercaya yang memudahkan layanan hewan qurban cepat, aman, dan amanah.",
  },
];

const Portfolio = () => {
  const containerRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = portfolioSlides.length;

  // Add loading handler
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".swiper-slide");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + containerRef.current.offsetWidth,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
      partnerLabel: "WE PARTNERED WITH",
      title: "Trust Indonesia to create Web Kandidatpro",
      date: "20 Januari 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
      partnerLabel: "WE PARTNERED WITH",
      title: "PLN to create web Strategy Navigation Flightdeck",
      date: "20 Januari 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
      partnerLabel: "WE PARTNERED WITH",
      title: "PLN to create web Strategy Navigation Flightdeck",
      date: "20 Januari 2025",
    },
  ];

  return (
    // <section className="min-h-screen md:mb-20 flex items-center bg-white">
    //   <div className="container mx-auto px-4 md:px-6">
    //     <div className="flex items-end justify-center md:justify-start flex-wrap gap-4 md:gap-6">
    //       {projects.map((project, index) => (
    //         <div
    //           key={index}
    //           className="group flex flex-col hover:gap-4 opacity-50 hover:opacity-100 w-[300px] rounded-lg transition-all duration-300"
    //         >
    //           <div className="relative w-full h-full transition-all duration-300">
    //             <img
    //               src={project.image}
    //               alt={project.title}
    //               className="w-full h-[500px] object-cover rounded-[12px]"
    //             />
    //           </div>
    //           <div className="opacity-0 group-hover:opacity-100 h-0 group-hover:h-[130px] flex flex-col gap-1 transition-all duration-300">
    //             <span className="uppercase font-semibold text-xs text-gray-500">
    //               {project.partnerLabel}
    //             </span>
    //             <h2 className="uppercase font-semibold text-lg md:text-xl">
    //               {project.title}
    //             </h2>
    //             <time className="text-xs text-gray-400">{project.date}</time>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
    <div
      ref={containerRef}
      className="carousel-container relative w-full h-screen"
    >
      {imagesLoaded < totalImages && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <Swiper slidesPerView={1} spaceBetween={0} className="h-full">
        {portfolioSlides.map((slide, index) => (
          <SwiperSlide key={index} className="h-full">
            <div className="relative w-full h-full overflow-hidden">
              <img
                onLoad={handleImageLoad}
                src={slide.image}
                srcSet={`
                  ${slide.image} 768w,
                  ${slide.image} 1024w,
                  ${slide.image} 1920w
                `}
                sizes="100vw"
                alt={slide.alt}
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center">
                <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-start md:justify-between gap-4 md:gap-0">
                  <div className="md:w-1/2">
                    <h2 className="text-white text-5xl font-bold">
                      {slide.title}
                    </h2>
                  </div>
                  <div className="md:text-end md:w-1/3">
                    <p className="text-white text-xl font-medium">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Portfolio;
