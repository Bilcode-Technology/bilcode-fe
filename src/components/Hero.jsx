import SponsorsRotator from "./SponsorsRotator";

const Hero = () => {
  return (
    <section className=" min-h-screen md:mb-20 flex flex-col items-center justify-center bg-white text-center">
      {/* Announcement Banner */}
      <div className="bg-gray-100 px-4 py-1 rounded-full mb-4 text-xs md:text-base md:mb-6 md:mt-[120px]">
        <span className=" text-gray-700">
          <span className="font-semibold">Unggulan:</span> Solusi Web & Aplikasi
          End-to-End{" "}
          {/* <a href="#" className="text-[#3852F7] hover:underline font-medium">
            Pelajari lebih lanjut
          </a> */}
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="font-marker text-4xl md:text-[80px] font-bold leading-tight md:leading-[70px] text-black mb-4 md:mb-8 max-w-4xl">
        Solusi Cepat & Handal
        <br />
        untuk Bisnis Anda
      </h1>

      {/* CTA Button */}
      <a
        href="http://wa.me/6285128004772"
        className="bg-[#3852F7] hover:scale-110 text-white font-semibold text-sm md:text-lg px-4 py-2 md:px-8 md:py-4 rounded-full mb-6 md:mb-10 cursor-pointer transition-all duration-300"
      >
        Dapatkan Konsultasi Gratis
      </a>

      {/* Stats Text */}
      <p className="mb-8 md:mb-12 max-w-2xl">
        <span className="font-medium">
          Lebih dari 20+ klien mempercayai Bilcode
        </span>{" "}
        untuk membangun produk digital mereka.
      </p>

      {/* Sponsors Rotator (crossfade, no shifting) */}
      <div className="w-full px-5 md:px-0 md:max-w-5xl">
        <SponsorsRotator
          items={[
            { name: "Spotify", logo: "https://logo.clearbit.com/spotify.com" },
            { name: "Stripe", logo: "https://logo.clearbit.com/stripe.com" },
            { name: "Figma", logo: "https://logo.clearbit.com/figma.com" },
            { name: "AWS", logo: "https://logo.clearbit.com/aws.amazon.com" },
            {
              name: "Google Cloud",
              logo: "https://logo.clearbit.com/cloud.google.com",
            },
            { name: "Vercel", logo: "https://logo.clearbit.com/vercel.com" },
            { name: "Netlify", logo: "https://logo.clearbit.com/netlify.com" },
            {
              name: "Cloudflare",
              logo: "https://logo.clearbit.com/cloudflare.com",
            },
            { name: "Shopify", logo: "https://logo.clearbit.com/shopify.com" },
            { name: "Zapier", logo: "https://logo.clearbit.com/zapier.com" },
            { name: "OpenAI", logo: "https://logo.clearbit.com/openai.com" },
            { name: "Notion", logo: "https://logo.clearbit.com/notion.so" },
            { name: "Linear", logo: "https://logo.clearbit.com/linear.app" },
            { name: "AKQA", logo: "https://logo.clearbit.com/akqa.com" },
            { name: "Linktree", logo: "https://logo.clearbit.com/linktr.ee" },
            { name: "Huge", logo: "https://logo.clearbit.com/hugeinc.com" },
          ]}
          interval={1.8}
        />
      </div>
    </section>
  );
};

export default Hero;
