import React from 'react';
import { Twitter, Linkedin, ExternalLink, Award, BookOpen, Users } from 'lucide-react';
import { instructors } from '../data/instructors';

const InstructorsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Section Introduction */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4 border border-blue-200">
            MEET OUR TEAM
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Belajar dari yang <span className="text-blue-600">Terbaik</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Instruktur kami adalah para profesional berpengalaman di bidangnya masing-masing, 
            siap membimbing Anda menuju kesuksesan.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {instructors.map((instructor) => (
            <div 
              key={instructor.id} 
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-slate-100 overflow-hidden transform hover:-translate-y-3 transition-all duration-500 ease-out hover:border-blue-200"
            >
              {/* Profile Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={instructor.image} 
                  alt={instructor.name} 
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {instructor.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-1">{instructor.title}</p>
                <p className="text-slate-500 text-sm mb-6">{instructor.subtitle}</p>

                {/* Social Links */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <a 
                      href={instructor.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a 
                      href={instructor.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                  <a 
                    href={instructor.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                  >
                    Portofolio 
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-slate-900 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Siap Memulai Perjalanan Belajar Anda?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan siswa yang telah mengembangkan karir mereka bersama instruktur terbaik kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Lihat Kursus
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                Konsultasi Gratis
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 border-t border-slate-200 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Mengapa Memilih Instruktur Kami?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Bersertifikat Internasional</h4>
              <p className="text-slate-600">Semua instruktur memiliki sertifikasi dan pengalaman industri yang diakui secara global.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Pembelajaran Personal</h4>
              <p className="text-slate-600">Pendekatan pembelajaran yang disesuaikan dengan kebutuhan dan gaya belajar setiap siswa.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Kurikulum Terkini</h4>
              <p className="text-slate-600">Materi pembelajaran selalu diperbarui mengikuti tren dan kebutuhan industri terbaru.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;
