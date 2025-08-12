import { navItems } from "../data/navItems";

const Footer = () => {
  const industriesConfig = navItems.find((i) => i.label === "Industries");
  const industries = [
    ...(industriesConfig?.megaMenuContent?.leftColumnCards || []),
    ...(industriesConfig?.megaMenuContent?.middleColumnCards || []),
    ...(industriesConfig?.megaMenuContent?.rightColumnCards || []),
  ].map((c) => c.title);

  return (
    <footer className="bg-white font-sans text-gray-800 py-10 md:py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-16 mb-12">
          {/* Services Column */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Services
            </h3>
            <ul className="space-y-3 text-gray-700 font-light">
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Mobile Apps
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  AI & Automation
                </a>
              </li>
            </ul>
          </div>

          {/* Approach Column */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Approach
            </h3>
            <ul className="space-y-3 text-gray-700 font-light">
              <li>
                <a href="#" className="text-gray-700 hover:text-black">Approach</a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">Case Studies</a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">eBooks</a>
              </li>
            </ul>
          </div>

          {/* Industries Column (auto from navItems) */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Industries</h3>
            <ul className="space-y-3 text-gray-700 font-light">
              {industries.map((title, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-700 hover:text-black">{title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Column (auto from navItems) */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Industries</h3>
            <ul className="space-y-3 text-gray-700 font-light">
              {industries.slice(0,6).map((title, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-700 hover:text-black">{title}</a>
                </li>
              ))}
            </ul>
          </div>



          {/* News Column */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              News
            </h3>
            <ul className="space-y-3 text-gray-700 font-light">
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">Events & Training</a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">Webinars</a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">Speakers</a>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              About
            </h3>
            <ul className="space-y-3 text-gray-700 font-light">
              <li>
                <a href="#" className="text-gray-700 hover:text-black">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">Careers ↗</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Subscribe to our newsletter</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed max-w-md">Articles, case studies, webinars, events, and more — don’t miss an opportunity to grow your knowledge.</p>
            <form className="flex w-full max-w-lg" onSubmit={(e)=>e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-sm outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button className="bg-blue-600 text-white px-5 py-2 rounded-r-sm hover:bg-blue-700 text-sm font-semibold">
                SUBSCRIBE
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <p className="text-gray-700 mb-2"><a href="tel:+6285128004772" className="hover:underline">+62 851-2800-4772</a></p>
              <p className="text-gray-700 mb-4"><a href="mailto:info@bilcode.id" className="hover:underline">info@bilcode.id</a></p>

              {/* Social Media */}
              <div className="flex flex-wrap gap-4 items-center">
                <a href="https://api.whatsapp.com/send/?phone=6285128004772&text&type=phone_number&app_absent=0" aria-label="WhatsApp" className="text-gray-600 hover:text-black underline">WhatsApp</a>
                <a href="https://discord.com/invite/G7nF8PCaDX" aria-label="Discord" className="text-gray-600 hover:text-black underline">Discord</a>
                <a href="https://www.instagram.com/bilcode.id/" aria-label="Instagram" className="text-gray-600 hover:text-black underline">Instagram</a>
                <a href="https://www.tiktok.com/@bilcode.id" aria-label="TikTok" className="text-gray-600 hover:text-black underline">TikTok</a>
                <a href="https://www.youtube.com/@bilcodejoki" aria-label="YouTube" className="text-gray-600 hover:text-black underline">YouTube</a>
                <a href="https://www.threads.com/@bilcodejoki" aria-label="Threads" className="text-gray-600 hover:text-black underline">Threads</a>
                <a href="https://x.com/bilcodejoki" aria-label="X (Twitter)" className="text-gray-600 hover:text-black underline">X</a>
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">Head Office — Cirebon</h4>
            <p className="text-sm text-gray-600">Jl. Sena 3, No.9, Tuk, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153</p>
            <p className="text-xs text-gray-500 mt-1">Coordinates: -6.725249757389856, 108.53331791427351</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Jakarta Office</h4>
            <p className="text-sm text-gray-600">SCBD, Gedung Treasury Tower, Kawasan District 8 LOT 28, Jl. Tulodong Atas 2 No.28, RT.5/RW.3, Senayan, Kec. Kby. Baru, Kota Jakarta Selatan, DKI Jakarta 12190</p>
            <p className="text-xs text-gray-500 mt-1">Coordinates: -6.227588452299263, 106.80611051022044</p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-wrap justify-between items-center pt-8 border-t border-gray-200 text-sm text-gray-500">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">English</a>
          </div>
          <div className="flex space-x-6">
            <span>© 2025</span>
            <a href="#" className="hover:text-gray-700">Website by Bilcode</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
