import React from 'react';
import { CheckCircle, Zap, Shield, Award, MessageSquare, DollarSign, ArrowRight, Code, Star } from 'lucide-react';

const JokiPage = () => {
  const features = [
    {
      icon: <Award size={32} className="text-blue-600" />,
      title: 'Kode Berkualitas Tinggi',
      description: 'Kode yang kami tulis bersih, terstruktur, dan mudah dipahami, sesuai dengan best practice.',
    },
    {
      icon: <Zap size={32} className="text-purple-600" />,
      title: 'Pengerjaan Cepat',
      description: 'Kami bekerja secara efisien untuk menyelesaikan tugas Anda sesuai dengan deadline yang ditentukan.',
    },
    {
      icon: <Shield size={32} className="text-green-600" />,
      title: 'Privasi Terjamin',
      description: 'Identitas dan detail tugas Anda kami jamin kerahasiaannya 100%.',
    },
    {
      icon: <CheckCircle size={32} className="text-orange-600" />,
      title: 'Revisi Gratis',
      description: 'Dapatkan revisi minor gratis untuk memastikan hasil akhir sesuai dengan keinginan Anda.',
    },
  ];

  const packages = [
    {
      name: 'Paket Cepat',
      price: 'Mulai dari 150k',
      description: 'Untuk tugas-tugas sederhana dengan deadline ketat.',
      features: ['1-3 Hari Pengerjaan', '1x Revisi Minor', 'Konsultasi Singkat'],
      isPopular: false,
      color: 'border-gray-200',
      bgGradient: 'bg-gradient-to-br from-gray-50 to-white',
    },
    {
      name: 'Paket Standar',
      price: 'Mulai dari 350k',
      description: 'Solusi paling populer untuk tugas dan proyek menengah.',
      features: ['4-7 Hari Pengerjaan', '2x Revisi Minor', 'Konsultasi Detail', 'Source Code Lengkap'],
      isPopular: true,
      color: 'border-blue-300',
      bgGradient: 'bg-gradient-to-br from-blue-50 to-white',
    },
    {
      name: 'Paket Pro',
      price: 'Hubungi Kami',
      description: 'Untuk proyek besar, kompleks, atau kebutuhan custom.',
      features: ['Deadline Fleksibel', 'Revisi Tak Terbatas', 'Support Penuh', 'Dokumentasi'],
      isPopular: false,
      color: 'border-purple-200',
      bgGradient: 'bg-gradient-to-br from-purple-50 to-white',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative pt-40 pb-24 container mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-8">
            <Code size={16} className="mr-2" />
            Trusted by 500+ Students
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight">
            Tugas Coding
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Bikin Pusing?
            </span>
          </h1>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mt-4 mb-8">
            Kami Punya Solusinya! ⚡
          </h2>
          
          <p className="mt-8 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Layanan joki tugas coding profesional dari <span className="font-bold text-blue-600">Bilcode</span> siap membantu Anda menyelesaikan tugas kuliah, proyek akhir, atau bahkan persiapan technical test dengan cepat dan rapi.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Bilcode,%20saya%20tertarik%20dengan%20layanan%20joki%20coding."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <MessageSquare className="mr-3 group-hover:animate-pulse" size={24} />
              Konsultasi Gratis via WhatsApp
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
            </a>
            
            <div className="flex items-center text-gray-600">
              <div className="flex -space-x-2 mr-3">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="font-medium">4.9/5 dari 200+ review</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Cara Kerja Kami</h2>
            <p className="text-xl text-gray-600">Prosesnya mudah, cepat, dan transparan.</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare size={40} />,
                title: '1. Konsultasi',
                desc: 'Hubungi kami via WhatsApp, jelaskan detail tugas dan deadline Anda.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: <DollarSign size={40} />,
                title: '2. Penawaran',
                desc: 'Kami akan memberikan penawaran harga terbaik sesuai tingkat kesulitan.',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: <Zap size={40} />,
                title: '3. Pengerjaan',
                desc: 'Setelah deal, kami akan langsung mengerjakan tugas Anda secepatnya.',
                color: 'from-purple-500 to-purple-600'
              }
            ].map((step, index) => (
              <div key={index} className="group relative">
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br ${step.color} text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="text-gray-300" size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Kenapa Memilih Kami?</h2>
            <p className="text-xl text-gray-600">Kami memberikan lebih dari sekedar kode.</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 p-4 bg-white rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Paket Harga</h2>
            <p className="text-xl text-gray-600">Pilih paket yang paling sesuai dengan kebutuhan Anda.</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div key={index} className={`group relative rounded-3xl p-8 transition-all duration-300 transform hover:-translate-y-4 hover:shadow-2xl ${pkg.bgGradient} ${pkg.isPopular ? 'border-3 border-blue-400 scale-105' : 'border border-gray-200'}`}>
                
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg flex items-center">
                      <Star size={16} className="mr-1 fill-current" />
                      Paling Populer
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-3xl font-black text-gray-900 mb-3">{pkg.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{pkg.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {pkg.price}
                    </span>
                  </div>
                  
                  <ul className="space-y-4 text-left mb-10">
                    {pkg.features.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <div className="flex-shrink-0 p-1 bg-green-100 rounded-full mr-4">
                          <CheckCircle className="text-green-600" size={20} />
                        </div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href={`https://wa.me/6281234567890?text=Halo%20Bilcode,%20saya%20tertarik%20dengan%20${pkg.name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/btn w-full inline-flex items-center justify-center px-8 py-4 font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      pkg.isPopular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl' 
                        : 'bg-white text-gray-800 border-2 border-gray-200 hover:border-blue-300 shadow-md hover:shadow-lg'
                    }`}
                  >
                    Pilih Paket
                    <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Siap Untuk Memulai?
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Jangan biarkan tugas coding mengganggu hidup Anda. Mari kita selesaikan bersama dengan profesional dan tepat waktu!
            </p>
            
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600">500+</div>
                  <div className="text-gray-600 font-medium">Tugas Selesai</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-600">24/7</div>
                  <div className="text-gray-600 font-medium">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-green-600">98%</div>
                  <div className="text-gray-600 font-medium">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-orange-600">3 Jam</div>
                  <div className="text-gray-600 font-medium">Response Time</div>
                </div>
              </div>
            </div>
            
            <a
              href="https://wa.me/6281234567890?text=Halo%20Bilcode,%20saya%20ingin%20konsultasi%20tentang%20tugas%20coding%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-black text-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
            >
              <MessageSquare className="mr-4 group-hover:animate-bounce" size={28} />
              Mulai Konsultasi Sekarang
              <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" size={28} />
            </a>
            
            <p className="mt-6 text-gray-500">
              💬 Response dalam 3 jam • 🔒 Privasi terjamin • ✅ Garansi kepuasan
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JokiPage;