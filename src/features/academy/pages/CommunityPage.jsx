import React from 'react';
import { MessageSquare, Users, ExternalLink } from 'lucide-react';

const CommunityPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-20 pt-40">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Bergabunglah dengan Komunitas Kami
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Terhubung dengan sesama pembelajar, instruktur, dan profesional industri. 
            Dapatkan dukungan, bagikan pengetahuan, dan tumbuh bersama.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center flex flex-col items-center justify-center">
            <MessageSquare className="w-16 h-16 text-blue-600 mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Forum Diskusi</h2>
            <p className="text-slate-600 mb-6">Ajukan pertanyaan, diskusikan topik, dan dapatkan bantuan dari komunitas kami yang aktif.</p>
            <a 
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors duration-300 group"
            >
              Kunjungi Forum
              <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center flex flex-col items-center justify-center">
            <Users className="w-16 h-16 text-green-600 mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Grup Discord</h2>
            <p className="text-slate-600 mb-6">Bergabunglah dengan server Discord kami untuk obrolan real-time, sesi tanya jawab, dan acara komunitas.</p>
            <a 
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-lg bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors duration-300 group"
            >
              Gabung Discord
              <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Ikuti Kami di Media Sosial</h3>
          <p className="text-lg text-slate-600 mb-8">Tetap terhubung dan dapatkan update terbaru dari kami.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors duration-300">
              {/* Replace with actual social media icons */}
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.007-.532A8.318 8.318 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.107 4.107 0 001.27 5.477A4.072 4.072 0 012 10.772v.058a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.844"></path></svg>
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors duration-300">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22H12c5.523 0 10-4.477 10-10z" clipRule="evenodd"></path></svg>
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors duration-300">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.163 6.839 9.489.5.092.682-.217.682-.483 0-.237-.007-.867-.011-1.7C6.746 19.416 6 17.911 6 17.911c-.489-1.244-1.19-1.57-1.19-1.57-.978-.665.07-.653.07-.653 1.089.07 1.659 1.118 1.659 1.118.969 1.659 2.54 1.179 3.15.899.092-.695.357-1.179.653-1.444-2.41-.272-4.94-1.208-4.94-5.37 0-1.18.42-2.145 1.118-2.895-.11-.272-.483-1.36.103-2.845 0 0 .91-.289 2.806 1.115.86-.237 1.77-.357 2.68-.357.91 0 1.82.12 2.68.357 1.89-1.404 2.806-1.115 2.806-1.115.586 1.485.213 2.573.103 2.845.698.75 1.118 1.715 1.118 2.895 0 4.17-2.535 5.09-4.95 5.357.357.307.678.915.678 1.846 0 1.335-.012 2.41-.012 2.735 0 .268.18.578.688.482C19.137 20.163 22 16.419 22 12z" clipRule="evenodd"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;