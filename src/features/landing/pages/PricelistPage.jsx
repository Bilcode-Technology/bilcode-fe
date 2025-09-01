import React from 'react';
import { CheckCircle, Code, Smartphone, Paintbrush, ArrowRight } from 'lucide-react';

const PricelistPage = () => {
  const services = [
    {
      category: 'Web Development',
      description: 'Membangun situs web dan aplikasi web yang responsif dan modern.',
      packages: [
        {
          name: 'Basic Website',
          price: 'Mulai dari Rp 5 Juta',
          features: [
            'Desain Responsif',
            '5 Halaman Statis',
            'Integrasi Formulir Kontak',
            'SEO Dasar',
            'Support 1 Bulan',
          ],
        },
        {
          name: 'Custom Web App',
          price: 'Mulai dari Rp 20 Juta',
          features: [
            'Desain Kustom Penuh',
            'Fitur Interaktif (Login, Database)',
            'Integrasi API Pihak Ketiga',
            'Optimasi Performa',
            'Support 3 Bulan',
          ],
        },
      ],
    },
    {
      category: 'Mobile Development',
      description: 'Mengembangkan aplikasi mobile native atau cross-platform.',
      packages: [
        {
          name: 'Basic Mobile App',
          price: 'Mulai dari Rp 10 Juta',
          features: [
            'Desain UI/UX Dasar',
            'Fitur Utama (Login, Profil)',
            'Kompatibel Android/iOS (Cross-platform)',
            'Support 1 Bulan',
          ],
        },
        {
          name: 'Advanced Mobile App',
          price: 'Mulai dari Rp 35 Juta',
          features: [
            'Desain UI/UX Kustom',
            'Integrasi API Kompleks',
            'Notifikasi Push',
            'Analitik Lanjutan',
            'Support 3 Bulan',
          ],
        },
      ],
    },
    {
      category: 'UI/UX Design',
      description: 'Menciptakan pengalaman pengguna yang intuitif dan visual yang menarik.',
      packages: [
        {
          name: 'Basic UI/UX',
          price: 'Mulai dari Rp 3 Juta',
          features: [
            'Wireframing & Flowchart',
            'Desain Antarmuka (UI) Dasar',
            'User Persona',
            '1x Revisi',
          ],
        },
        {
          name: 'Full UI/UX Project',
          price: 'Mulai dari Rp 15 Juta',
          features: [
            'Riset Pengguna Mendalam',
            'Prototyping Interaktif',
            'User Testing',
            'Desain Sistem (Design System)',
            'Revisi Tak Terbatas',
          ],
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 pt-32 pb-20">
      {/* Hero Section */}
      <section className="text-center container mx-auto px-4 pb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Harga Transparan,
          <span className="block text-blue-600">Kualitas Terjamin</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          Kami menawarkan berbagai paket layanan yang fleksibel dan transparan untuk memenuhi kebutuhan digital Anda. Dapatkan solusi terbaik dengan harga yang kompetitif.
        </p>
        <a
          href="https://wa.me/6281234567890?text=Halo%20Bilcode,%20saya%20ingin%20mendapatkan%20penawaran%20harga%20kustom."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Dapatkan Penawaran Kustom
          <ArrowRight className="ml-2" size={20} />
        </a>
      </section>

      {/* Services Pricing Section */}
      {services.map((service, index) => (
        <section key={index} className="py-16 bg-white border-b border-gray-100 last:border-b-0">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900">{service.category}</h2>
              <p className="text-lg text-gray-600 mt-2">{service.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {service.packages.map((pkg, pkgIndex) => (
                <div key={pkgIndex} className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-100 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                  <p className="text-4xl font-extrabold text-blue-600 mb-6">{pkg.price}</p>
                  <ul className="space-y-3 text-gray-700 flex-grow mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Bilcode,%20saya%20tertarik%20dengan%20paket%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
                  >
                    Pilih Paket
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Custom Quote CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">
            Tidak Menemukan Paket yang Sesuai?
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Kami juga menyediakan layanan kustom yang disesuaikan dengan kebutuhan spesifik proyek Anda. Hubungi kami untuk diskusi lebih lanjut dan penawaran terbaik.
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Bilcode,%20saya%20ingin%20mendapatkan%20penawaran%20harga%20kustom."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
          >
            Minta Penawaran Kustom
            <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default PricelistPage;
