import SponsorsRotator from "./SponsorsRotator";

const Hero = () => {
  return (
    <section className=" min-h-screen flex flex-col items-center justify-center bg-white text-center">
      {/* Announcement Banner */}
      <div className="bg-gray-100 px-4 py-1 rounded-full mb-6">
        <span className=" text-gray-700">
          <span className="font-semibold">Featured:</span> End-to-End Web & App
          Solutions{" "}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Learn more
          </a>
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="font-marker text-5xl sm:text-6xl md:text-[80px] font-bold leading-tight md:leading-[70px] text-black mb-8 max-w-4xl">
        Fast & Reliable Solutions
        <br />
        for Your Business
      </h1>

      {/* CTA Button */}
      <button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold text-lg px-8 py-4 rounded-full mb-16 cursor-pointer">
        Get a Free Consultation
      </button>

      {/* Stats Text */}
      <p className=" mb-12 max-w-2xl">
        <span className="font-medium">
          Over 20+ clients trust Bilcode Technology
        </span>{" "}
        to build their digital products.
      </p>

      {/* Sponsors Rotator (crossfade, no shifting) */}
      <div className="w-full max-w-5xl mt-6">
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
