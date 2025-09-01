import React from 'react';
import { Briefcase, Users, Heart, Award, ArrowRight, Mail } from 'lucide-react';

const CareerPage = () => {
  const openPositions = [
    {
      title: 'Fullstack Developer (Node.js/React)',
      location: 'Remote',
      type: 'Full-time',
      description: 'Membangun dan memelihara aplikasi web skala penuh.',
    },
    {
      title: 'UI/UX Designer',
      location: 'Remote',
      type: 'Full-time',
      description: 'Merancang pengalaman pengguna yang intuitif dan menarik.',
    },
    {
      title: 'Digital Marketing Specialist',
      location: 'Remote',
      type: 'Full-time',
      description: 'Mengembangkan dan melaksanakan strategi pemasaran digital.',
    },
  ];

  const benefits = [
    {
      icon: <Heart size={24} className="text-red-500" />,
      title: 'Kesehatan & Kesejahteraan',
      description: 'Asuransi kesehatan komprehensif dan program kesejahteraan.',
    },
    {
      icon: <Award size={24} className="text-yellow-500" />,
      title: 'Pengembangan Karir',
      description: 'Akses ke kursus, sertifikasi, dan mentoring.',
    },
    {
      icon: <Users size={24} className="text-green-500" />,
      title: 'Lingkungan Kolaboratif',
      description: 'Tim yang suportif dan budaya kerja yang inklusif.',
    },
    {
      icon: <Briefcase size={24} className="text-blue-500" />,
      title: 'Fleksibilitas Kerja',
      description: 'Opsi kerja remote dan jam kerja yang fleksibel.',
    },
  ];

  return (
    <div className="bg-gray-50 pt-32 pb-20">
      {/* Hero Section */}
      <section className="text-center container mx-auto px-4 pb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Bergabunglah dengan Tim
          <span className="block text-blue-600">Bilcode</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          Kami mencari talenta terbaik untuk bersama-sama membangun masa depan digital. Jika Anda bersemangat tentang teknologi dan inovasi, mari bergabung!
        </p>
        <a
          href="mailto:careers@bilcode.com"
          className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Lihat Posisi Terbuka
          <ArrowRight className="ml-2" size={20} />
        </a>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Posisi Terbuka</h2>
            <p className="text-lg text-gray-600 mt-2">Temukan peran yang cocok untuk Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {openPositions.map((position, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{position.title}</h3>
                <p className="text-gray-600 mb-1">{position.location} &middot; {position.type}</p>
                <p className="text-gray-700 mt-4">{position.description}</p>
                <a
                  href="mailto:careers@bilcode.com"
                  className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Lamar Sekarang <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Manfaat Bekerja di Bilcode</h2>
            <p className="text-lg text-gray-600 mt-2">Kami peduli dengan pertumbuhan dan kesejahteraan Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Siap Memulai Karir Anda Bersama Kami?
          </h2>
          <a
            href="mailto:careers@bilcode.com"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Kirim Lamaran Anda
            <Mail className="ml-2" size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
