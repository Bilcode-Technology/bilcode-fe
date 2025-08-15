import {
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandThreads,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";
// import { navItems } from "../data/navItems";

const Footer = () => {
  // const industriesConfig = navItems.find((i) => i.label === "Industries");
  // const industries = [
  //   ...(industriesConfig?.megaMenuContent?.leftColumnCards || []),
  //   ...(industriesConfig?.megaMenuContent?.middleColumnCards || []),
  //   ...(industriesConfig?.megaMenuContent?.rightColumnCards || []),
  // ].map((c) => c.title);

  return (
    <footer className="bg-white font-sans text-gray-800">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 pt-6 pb-8 border-t border-gray-200">
          <div>
            <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-4">
              Service
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:underline">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Mobile Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  AI & Automation
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  IT Academy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-4">
              Our Product
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:underline">
                  Kandidat Pro
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Bilcode Joki
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2"></div>

          <div>
            <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-4">
              News
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:underline">
                  Event and Training
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Seminar
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Speaker
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-4">
              About
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Career
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-6 pb-8 border-t border-gray-200">
          <div className="border-r border-gray-200 flex flex-col justify-between gap-3">
            <div>
              <h3 className=" text-sm font-medium uppercase tracking-wide mb-3">
                Subscribe to our newsletter
              </h3>
              <p className="text-gray-500 text-xs mb-4 leading-relaxed max-w-md">
                Articles, case studies, webinars, events, and more — don’t miss
                an opportunity to grow your knowledge.
              </p>
            </div>
            <form
              className="flex w-full gap-2 max-w-lg border border-gray-200 rounded-sm p-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 outline-none focus:ring-0"
                required
              />
              <button className="bg-blue-600 text-white p-4 rounded-sm hover:bg-blue-700 text-xs font-medium">
                SUBSCRIBE
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {/* Contact Info */}
            <div>
              <p className="">
                <a href="tel:+6285128004772" className="hover:underline">
                  +62 851-2800-4772
                </a>
              </p>
            </div>
            <div>
              <p className="">
                <a href="mailto:info@bilcode.id" className="hover:underline">
                  halo@bilcode.id
                </a>
              </p>
            </div>
            <div>
              {/* Social Media */}
              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="https://api.whatsapp.com/send/?phone=6285128004772"
                  aria-label="WhatsApp"
                  className="text-gray-500 hover:text-black"
                >
                  <IconBrandWhatsapp />
                </a>
                <a
                  href="https://discord.com/invite/G7nF8PCaDX"
                  aria-label="Discord"
                  className="text-gray-500 hover:text-black"
                >
                  <IconBrandDiscord />
                </a>
                <a
                  href="https://www.instagram.com/bilcode.id/"
                  aria-label="Instagram"
                  className="text-gray-500 hover:text-black"
                >
                  <IconBrandInstagram />
                </a>
                <a
                  href="https://www.tiktok.com/@bilcode.id"
                  aria-label="TikTok"
                  className="text-gray-500 hover:text-black"
                >
                  <IconBrandTiktok />
                </a>
                <a
                  href="https://www.youtube.com/@bilcodejoki"
                  aria-label="YouTube"
                  className="text-gray-500 hover:text-black"
                >
                  <IconBrandYoutube />
                </a>
                <a
                  href="https://www.threads.com/@bilcodejoki"
                  aria-label="Threads"
                  className="text-gray-500 hover:text-black"
                >
                  <IconBrandThreads />
                </a>
                <a
                  href="https://x.com/bilcodejoki"
                  aria-label="X (Twitter)"
                  className="text-gray-500 hover:text-black"
                >
                  <IconBrandX />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">
                Head Office — Cirebon
              </h4>
              <p className="text-xs text-gray-500 mb-2">
                Jl. Sena 3, No.9, Tuk, Kec. Kedawung, Kabupaten Cirebon, Jawa
                Barat 45153
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-4">Jakarta Office</h4>
              <p className="text-xs text-gray-500 mb-2">
                SCBD, Gedung Treasury Tower, Kawasan District 8 LOT 28, Senayan,
                Kota Jakarta Selatan, DKI Jakarta 12190
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 pb-10 border-t border-gray-200 text-xs text-gray-500">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <a href="#" className="hover:text-gray-700">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-700">
              English
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <span>© 2025</span>
            <a href="#" className="hover:text-gray-700">
              Website by Bilcode
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
