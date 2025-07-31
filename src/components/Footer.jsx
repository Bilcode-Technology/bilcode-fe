const Footer = () => {
  return (
    <footer className="bg-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              LAYANAN
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Kecerdasan buatan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Pengembangan web + selular
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Manajemen Data + BI
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Keamanan siber
                </a>
              </li>
            </ul>
          </div>

          {/* Approach Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              PENDEKATAN
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Mendekati
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Studi kasus
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Buku elektronik
                </a>
              </li>
            </ul>
          </div>

          {/* News Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              BERITA
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Barang
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Acara dan pelatihan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Seminar Web
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Pembicara
                </a>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              TENTANG
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Karier
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Berlangganan buletin kami
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              AI Inception adalah sumber andalan Anda untuk konten yang
              didedikasikan untuk kecerdasan buatan dan transformasi digital.
              Webinar, artikel, podcast, acara, tutorial, e-book, studi kasus
              jangan lewatkan kesempatan untuk memperluas pengetahuan Anda!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Alamat email Anda"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 font-medium">
                BERLANGGANAN
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <p className="text-gray-700 mb-2">Telepon: 1 844-800-0027</p>
              <p className="text-gray-700 mb-4">halo@vooban.com</p>

              {/* Social Media */}
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-2">Kota Montreal</h4>
            <p className="text-sm text-gray-600">
              2000 Bleury Street Suite 700
            </p>
            <p className="text-sm text-gray-600">Montreal, QC</p>
            <p className="text-sm text-gray-600">H3A 2J5</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Kota Toronto</h4>
            <p className="text-sm text-gray-600">
              217 Adelaide Street (Timur, Suite 201)
            </p>
            <p className="text-sm text-gray-600">Toronto, ON</p>
            <p className="text-sm text-gray-600">M5A 1M8</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Kota Quebec</h4>
            <p className="text-sm text-gray-600">
              510-3115 SM Wilfred-Pelletier
            </p>
            <p className="text-sm text-gray-600">Quebec, QC</p>
            <p className="text-sm text-gray-600">G1W 0C4</p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-wrap justify-between items-center pt-8 border-t border-gray-200 text-sm text-gray-500">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-700">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-gray-700">
              Bahasa Inggris
            </a>
          </div>
          <div className="flex space-x-6">
            <span>Hak Cipta © 2020</span>
            <a href="#" className="hover:text-gray-700">
              Situs web oleh Lokomotif
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
