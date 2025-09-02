import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, Search, X, Play, Users, Clock, Star, BookOpen, Award, Zap } from 'lucide-react';

import { courses } from '../data/courses.jsx';

const AcademyPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Semua');
  const [isVisible, setIsVisible] = useState(false);

  const levels = ['Semua', 'Pemula', 'Menengah', 'Lanjutan'];
  
  const stats = [
    { icon: BookOpen, label: "Kursus Tersedia", value: "150+" },
    { icon: Users, label: "Siswa Terdaftar", value: "25K+" },
    { icon: Award, label: "Sertifikat Diterbitkan", value: "18K+" },
    { icon: Star, label: "Rating Rata-rata", value: "4.8" }
  ];

  const features = [
    {
      icon: Play,
      title: "Pelajaran Video Interaktif",
      description: "Terlibat dengan konten video berkualitas tinggi yang dirancang untuk pembelajaran optimal"
    },
    {
      icon: Users,
      title: "Instruktur Ahli",
      description: "Belajar dari para profesional industri dengan pengalaman dunia nyata selama bertahun-tahun"
    },
    {
      icon: Award,
      title: "Program Sertifikasi",
      description: "Dapatkan sertifikat yang diakui untuk meningkatkan prospek karir Anda"
    },
    {
      icon: Zap,
      title: "Proyek Praktis",
      description: "Bangun proyek nyata untuk memperkuat portofolio dan keahlian Anda"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredCourses = useMemo(() => {
    return courses
      .filter(course => {
        if (selectedLevel === 'Semua') return true;
        return course.level === selectedLevel;
      })
      .filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery, selectedLevel]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Elemen Latar Belakang Animasi */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-100 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Bagian Hero */}
      <div className={`relative z-10 text-center pt-32 pb-20 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-6">
          <Zap className="w-4 h-4" />
          Belajar dari Para Ahli
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-slate-900 via-blue-800 to-blue-700 bg-clip-text text-transparent mb-6 leading-tight">
          AKADEMI
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed">
          Ubah karir Anda dengan keahlian mutakhir di bidang 
          <span className="font-semibold text-blue-600"> desain digital</span>, 
          <span className="font-semibold text-slate-700"> creative coding</span>, dan 
          <span className="font-semibold text-blue-500"> teknologi baru</span>
        </p>

        {/* Tombol CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-blue-200 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group">
            <Play className="w-5 h-5" />
            Mulai Belajar Sekarang
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
            Lihat Kursus Gratis
          </button>
        </div>

        {/* Bagian Statistik */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-blue-100 transition-all duration-300 group-hover:-translate-y-2">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Fitur */}
      <div className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Mengapa Memilih Akademi Kami?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Rasakan pendekatan revolusioner dalam belajar online dengan fitur yang dirancang untuk kesuksesan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-blue-100 transition-all duration-300 hover:-translate-y-2 group">
                <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bagian Pencarian dan Filter */}
      <div className="relative z-10 py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Temukan Kursus Sempurna Anda
            </h2>
            <p className="text-lg text-slate-600">
              Jelajahi katalog lengkap kami dan mulailah perjalanan belajar Anda hari ini
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
              <input 
                type="text"
                placeholder="Cari kursus, keahlian, atau topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-lg shadow-sm"
              />
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {levels.map(level => (
                <button 
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-1 ${
                    selectedLevel === level 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 shadow-md border border-slate-200'
                  }`}>
                  {level}
                </button>
              ))}
              {(searchQuery || selectedLevel !== 'Semua') &&
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedLevel('Semua'); }} 
                  className="p-3 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-full shadow-md hover:-translate-y-1 transition-all duration-300">
                  <X className="h-5 w-5" />
                </button>
              }
            </div>
          </div>

          {/* Grid Kursus */}
          {filteredCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.slice(0, 3).map((course) => (
                  <a 
                    href={course.href} 
                    key={course.id} 
                    className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-3 group"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      {course.specialOffer && (
                        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg animate-pulse">
                          🔥 Promo Spesial
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ 
                          course.level === 'Pemula' ? 'bg-blue-100 text-blue-800' :
                          course.level === 'Menengah' ? 'bg-sky-100 text-sky-800' :
                          'bg-indigo-100 text-indigo-800'
                        }`}>
                          {course.level}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-blue-500 fill-current" />
                          <span className="text-sm font-semibold text-slate-700">{course.score}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        {course.title}
                      </h3>
                      
                      <p className="text-sm text-slate-600 mb-4">Oleh {course.author}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.students}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div>
                          <span className="text-2xl font-bold text-slate-900">${course.price}</span>
                          <span className="text-sm text-slate-500 line-through ml-2">${course.originalPrice}</span>
                        </div>
                        <ArrowRight className="h-6 w-6 text-blue-600 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {filteredCourses.length > 3 && (
                <div className="text-center mt-12">
                  <a 
                    href="/academy" 
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors duration-300 group"
                  >
                    Lihat Semua Kursus
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Kursus Tidak Ditemukan</h3>
              <p className="text-slate-600 text-lg max-w-md mx-auto">
                Kami tidak dapat menemukan kursus yang cocok dengan kriteria Anda. Coba sesuaikan pencarian atau jelajahi kategori lain.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademyPage;