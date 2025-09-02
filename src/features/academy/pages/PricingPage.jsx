import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const PricingPage = () => {
  const pricingTiers = [
    {
      name: 'Gratis',
      price: 'Rp 0',
      period: '/ bulan',
      description: 'Akses dasar untuk memulai perjalanan belajar Anda.',
      features: [
        { text: 'Akses ke 3 kursus gratis', available: true },
        { text: 'Materi pembelajaran dasar', available: true },
        { text: 'Dukungan komunitas', available: true },
        { text: 'Sertifikat penyelesaian', available: false },
        { text: 'Akses ke semua kursus premium', available: false },
        { text: 'Dukungan instruktur pribadi', available: false },
      ],
      buttonText: 'Mulai Gratis',
      buttonClass: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    },
    {
      name: 'Premium Bulanan',
      price: 'Rp 150.000',
      period: '/ bulan',
      description: 'Akses penuh ke semua fitur dan kursus kami.',
      features: [
        { text: 'Akses ke semua kursus premium', available: true },
        { text: 'Materi pembelajaran lengkap', available: true },
        { text: 'Dukungan komunitas & instruktur', available: true },
        { text: 'Sertifikat penyelesaian', available: true },
        { text: 'Proyek praktis & studi kasus', available: true },
        { text: 'Akses awal ke kursus baru', available: true },
      ],
      buttonText: 'Pilih Paket Ini',
      buttonClass: 'bg-blue-600 text-white hover:bg-blue-700',
      isFeatured: true,
    },
    {
      name: 'Premium Tahunan',
      price: 'Rp 1.500.000',
      period: '/ tahun',
      description: 'Hemat lebih banyak dengan langganan tahunan.',
      features: [
        { text: 'Semua fitur Premium Bulanan', available: true },
        { text: 'Diskon 20% (hemat Rp 300.000)', available: true },
        { text: 'Sesi konsultasi 1-on-1 (1x/tahun)', available: true },
        { text: 'Akses prioritas ke acara eksklusif', available: true },
        { text: 'Sertifikat penyelesaian', available: true },
        { text: 'Dukungan instruktur pribadi', available: true },
      ],
      buttonText: 'Pilih Paket Ini',
      buttonClass: 'bg-blue-600 text-white hover:bg-blue-700',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-20 pt-40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Pilih Paket yang Tepat untuk Anda
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Mulai perjalanan belajar Anda dengan paket yang sesuai dengan kebutuhan dan tujuan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl shadow-xl p-8 flex flex-col border-2 ${tier.isFeatured ? 'border-blue-600 scale-105' : 'border-gray-200'}`}
            >
              {tier.isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  Paling Populer
                </div>
              )}
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{tier.name}</h2>
              <p className="text-slate-600 mb-6">{tier.description}</p>
              <div className="text-5xl font-extrabold text-slate-900 mb-2">
                {tier.price}
                <span className="text-xl font-medium text-slate-500">{tier.period}</span>
              </div>
              <ul className="flex-grow space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-slate-700">
                    {feature.available ? (
                      <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                    ) : (
                      <XCircle className="text-red-400 w-5 h-5 mr-2" />
                    )}
                    {feature.text}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${tier.buttonClass} ${tier.isFeatured ? 'shadow-lg' : ''}`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;