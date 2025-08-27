import { useMemo, useLayoutEffect, useRef } from "react";
import { PlayCircle, Star, Quote } from "lucide-react";
import { testimonialsData } from "../data/testimonialsData.js";
import { gsap } from "gsap";

// Daftar warna random tapi tetap base dari tone yang kuat
const cardColors = [
  "#3852F7", // biru base
  "#F73838", // merah
  "#F7A738", // oranye
  "#A738F7", // ungu
  "#38C7F7", // biru muda
  "#F738B4", // pink
];

// Fungsi ambil warna random
const getRandomColor = () =>
  cardColors[Math.floor(Math.random() * cardColors.length)];
const getCardColor = (index) => cardColors[index % cardColors.length];

const Card = ({ data, onVideoHover, onVideoHoverOut, index }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const playButtonRef = useRef(null);
  const handleMouseMove = useRef(null);
  const randomBgColor = useRef(getRandomColor());

  const cardColor = useMemo(() => getCardColor(index), [index]);

  const {
    type,
    quote,
    initials,
    name = "Unknown",
    location = "Unknown Location",
    rating = 5,
    avatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23ddd'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' font-family='Arial' font-size='14'%3EAvatar%3C/text%3E%3C/svg%3E",
  } = data || {};

  const handleVideoClick = () => {
    if (type === "video" && name) {
      const videoDetailUrl = `/video-testimonial/${name
        .toLowerCase()
        .replace(/\s+/g, "-")}`;
      try {
        window.open(`https://example.com${videoDetailUrl}`, "_blank");
      } catch (error) {
        console.error("Failed to open video link:", error);
      }
    }
  };

  const handleMouseEnter = () => {
    if (data?.type === "video") {
      const card = cardRef.current;
      const video = videoRef.current;
      const playButton = playButtonRef.current;

      // Play video
      video?.play().catch(console.error);

      // Scale up card
      gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" });

      // Fade out play button
      if (playButton) {
        gsap.to(playButton, { opacity: 0, duration: 0.3, ease: "power2.out" });
      }

      onVideoHover?.();

      // Parallax effect
      handleMouseMove.current = (e) => {
        if (!card || !video) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((centerX - x) / centerX) * 5;
        const translateX = ((x - centerX) / centerX) * 10;
        const translateY = ((y - centerY) / centerY) * 10;

        gsap.to(video, {
          rotationX: rotateX,
          rotationY: rotateY,
          x: translateX,
          y: translateY,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mousemove", handleMouseMove.current);
    }
  };

  const handleMouseLeave = () => {
    if (data?.type === "video") {
      const card = cardRef.current;
      const video = videoRef.current;
      const playButton = playButtonRef.current;

      // Pause video
      video?.pause();

      // Reset scale
      gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });

      // Show play button
      if (playButton) {
        gsap.to(playButton, { opacity: 1, duration: 0.3, ease: "power2.out" });
      }

      // Reset video transform
      if (video) {
        gsap.to(video, {
          rotationX: 0,
          rotationY: 0,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Remove mousemove listener
      if (handleMouseMove.current) {
        card.removeEventListener("mousemove", handleMouseMove.current);
        handleMouseMove.current = null;
      }

      onVideoHoverOut?.();
    }
  };

  if (type === "video") {
    const videoUrl =
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    return (
      <div
        ref={cardRef}
        className="testimonial-card w-60 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden flex-shrink-0 mx-4 cursor-pointer group"
        data-type="video"
        onClick={handleVideoClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
        }}
      >
        <div className={`relative w-full h-full overflow-hidden`}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            poster={avatar}
            src={videoUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={playButtonRef}
              className={`relative bg-white/95 backdrop-blur-sm rounded-full p-6 transition-opacity duration-300 shadow-lg opacity-100`}
            >
              <PlayCircle size={60} className="text-gray-800" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="flex items-center">
              <img
                src={avatar}
                alt={name}
                className="w-14 h-14 rounded-full object-cover font-bold text-xl"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23ddd' rx='28'/%3E%3Ctext x='28' y='28' text-anchor='middle' dy='.3em' font-family='Arial' font-size='12'%3ENA%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="ml-4 text-white">
                <p className="font-bold text-lg">{name}</p>
                <p className="text-sm opacity-90">{location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Text Card
  return (
    <div
      ref={cardRef}
      className="testimonial-card w-60 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden flex-shrink-0 mx-4 cursor-pointer transition-transform duration-500 ease-out group"
    >
      <div
        className={`w-full h-full p-6 flex flex-col justify-center relative overflow-hidden text-white`}
        style={{ backgroundColor: cardColor }}
      >
        <div className="relative z-10">
          <Quote size={32} className={`mb-4 `} />
          <div className="flex mb-6">
            {[...Array(Math.min(rating, 5))].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={`mr-1 text-yellow-400 fill-current`}
              />
            ))}
          </div>
          <p className={` text-lg font-medium leading-relaxed`}>
            "{quote || "No testimonial provided"}"
          </p>
          <div className="flex items-center mt-8">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center border`}
            >
              <span className=" font-bold text-xl">
                {initials ||
                  (name
                    ? name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                    : "NA")}
              </span>
            </div>
            <div className="ml-4">
              <p className={`font-bold text-lg`}>{name}</p>
              <p className={`text-sm `}>{location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const topTimelineRef = useRef(null);
  const bottomTimelineRef = useRef(null);

  const { topRowData, bottomRowData } = useMemo(() => {
    if (!testimonialsData || testimonialsData.length === 0) {
      return { topRowData: [], bottomRowData: [] };
    }

    const mid = Math.ceil(testimonialsData.length / 2);
    const topData = testimonialsData.slice(0, mid);
    const bottomData = testimonialsData.slice(mid);

    return {
      topRowData: [...topData, ...topData, ...topData], // Triple for smoother infinite loop
      bottomRowData: [...bottomData, ...bottomData, ...bottomData],
    };
  }, []);

  const handleVideoHover = () => {
    // Pause both carousels when hovering over video
    if (topTimelineRef.current) {
      topTimelineRef.current.pause();
    }
    if (bottomTimelineRef.current) {
      bottomTimelineRef.current.pause();
    }
  };

  const handleVideoHoverOut = () => {
    // Resume both carousels when leaving video
    if (topTimelineRef.current) {
      topTimelineRef.current.resume();
    }
    if (bottomTimelineRef.current) {
      bottomTimelineRef.current.resume();
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const topRow = topRowRef.current;
      const bottomRow = bottomRowRef.current;

      if (!topRow || !bottomRow) return;

      // Hitung panjang konten
      const topRowWidth = topRow.scrollWidth / 3; // karena kita triple data
      const bottomRowWidth = bottomRow.scrollWidth / 3;

      const baseSpeed = 100; // pixel per detik
      const topDuration = topRowWidth / baseSpeed;
      const bottomDuration = bottomRowWidth / baseSpeed;

      // Top row → jalan dari 0 ke -rowWidth, repeat terus
      const topTl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      topTl.fromTo(
        topRow,
        { x: 0 },
        { x: -topRowWidth, duration: topDuration }
      );

      // Bottom row → jalan dari -rowWidth ke 0, repeat terus
      const bottomTl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });
      bottomTl.fromTo(
        bottomRow,
        { x: -bottomRowWidth },
        { x: 0, duration: bottomDuration }
      );

      // Simpan refs untuk pause/resume
      topTimelineRef.current = topTl;
      bottomTimelineRef.current = bottomTl;
    }, [topRowRef, bottomRowRef]);

    return () => {
      ctx.revert();
      topTimelineRef.current = null;
      bottomTimelineRef.current = null;
    };
  }, [topRowData, bottomRowData]);

  return (
    <section className="overflow-hidden">
      <div className="relative min-h-screen flex items-center justify-center bg-white my-[80px]">
        {/* Enhanced title section */}
        {/* <div className="absolute z-10 text-center pointer-events-none select-none">
          <h1 className="text-[4rem] md:text-[6rem] font-bold text-gray-200 tracking-wider">
            Tesimonials
          </h1>
          <h1 className="text-[6rem] md:text-[10rem] font-black text-gray-800 tracking-tighter bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-sm">
            Tesimonials
          </h1>
          <h1 className="text-[4rem] md:text-[6rem] font-bold text-gray-200 tracking-wider">
            Tesimonials
          </h1>
        </div> */}

        {/* Card carousel */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center space-y-12 py-8">
          <div
            ref={topRowRef}
            className="w-full flex items-center top-row"
            style={{ width: "max-content" }}
          >
            {topRowData.map((card, index) => (
              <Card
                index={index}
                key={`top-${index}`}
                data={card}
                onVideoHover={handleVideoHover}
                onVideoHoverOut={handleVideoHoverOut}
              />
            ))}
          </div>
          <div
            ref={bottomRowRef}
            className="w-full flex items-center bottom-row"
            style={{ width: "max-content" }}
          >
            {bottomRowData.map((card, index) => (
              <Card
                index={index}
                key={`bottom-${index}`}
                data={card}
                onVideoHover={handleVideoHover}
                onVideoHoverOut={handleVideoHoverOut}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
