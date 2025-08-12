import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const projects = [
    {
      image: "https://via.placeholder.com/300",
      title: "Project Alpha",
      description: "A cutting-edge web application for a fintech startup.",
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Project Beta",
      description: "Mobile e-commerce solution with seamless user experience.",
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Project Gamma",
      description: "Enterprise-level data visualization dashboard.",
    },
    // tambah item sesuai kebutuhan...
  ];

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]); // akan berisi DOM nodes kartu

  // reset refs sebelum render ulang
  cardsRef.current = [];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cards = cardsRef.current;

    if (!section || !track || cards.length === 0) return;

    // gunakan gsap.context supaya cleanup otomatis pada unmount
    const ctx = gsap.context(() => {
      // berapa jauh track perlu digeser (px)
      const totalScroll = Math.max(0, track.scrollWidth - window.innerWidth);
      if (totalScroll === 0) return; // tidak perlu animasi kalau muat penuh

      // inisialisasi: sembunyikan semua description
      cards.forEach((card) => {
        const desc = card.querySelector(".project-desc");
        gsap.set(desc, { autoAlpha: 0, y: 10 });
        card.classList.remove("is-active");
        gsap.set(card, { scale: 1 });
      });

      // update active card berdasarkan posisi center relatif ke viewport center
      const updateActive = () => {
        const viewportCenter = window.innerWidth / 2;
        const showThreshold = window.innerWidth * 0.02; // ~2% => sangat dekat tengah untuk "aktif"
        const hideThreshold = window.innerWidth * 0.1; // 10% dari lebar viewport => sesuai permintaan

        cards.forEach((card) => {
          const desc = card.querySelector(".project-desc");
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const delta = Math.abs(cardCenter - viewportCenter);

          // masuk zona aktif
          if (delta <= showThreshold) {
            if (!card.classList.contains("is-active")) {
              card.classList.add("is-active");
              gsap.to(desc, { autoAlpha: 1, y: 0, duration: 0.25 });
              gsap.to(card, { scale: 1.03, duration: 0.25 }); // sedikit zoom saat aktif
            }
          }
          // sudah melewati zona hide (10%)
          else if (delta > hideThreshold) {
            if (card.classList.contains("is-active")) {
              card.classList.remove("is-active");
              gsap.to(desc, { autoAlpha: 0, y: 10, duration: 0.18 });
              gsap.to(card, { scale: 1, duration: 0.18 });
            }
          }
          // jika di antara showThreshold dan hideThreshold -> biarkan keadaan sebelumnya (hysteresis)
        });
      };

      // tween horizontal: geser track dari kanan ke kiri saat scroll
      gsap.to(track, {
        x: () => `-${totalScroll}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalScroll}`, // panjang scroll vertikal yang memetakan pergerakan horizontal
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: updateActive,
          invalidateOnRefresh: true,
        },
      });

      // cek awal (jika section sudah setengah di viewport)
      updateActive();

      // saat refresh (resize), sembunyikan dulu semua desc agar kalkulasi ulang bersih
      ScrollTrigger.addEventListener("refreshInit", () => {
        cards.forEach((card) => {
          const desc = card.querySelector(".project-desc");
          gsap.set(desc, { autoAlpha: 0, y: 10 });
          card.classList.remove("is-active");
        });
      });
    }, sectionRef);

    window.addEventListener("resize", ScrollTrigger.refresh);
    return () => {
      ctx.revert(); // hapus semua tween & scrolltrigger yang dibuat di context ini
      window.removeEventListener("resize", ScrollTrigger.refresh);
    };
  }, [projects.length]);

  return (
    <section ref={sectionRef} className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6">Our Portfolio</h2>
      </div>

      {/* viewport area: overflow-hidden supaya hanya bagian tengah terlihat */}
      <div className="relative overflow-hidden">
        {/* track yang akan digeser secara horizontal */}
        <div ref={trackRef} className="flex gap-8 px-8 py-12">
          {projects.map((project, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="project-card min-w-[320px] w-80 bg-gray-100 p-6 rounded-lg shadow-md transform"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>

              {/* description disembunyikan/ditampilkan via GSAP */}
              <div className="project-desc mt-3 text-gray-600">
                {project.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
