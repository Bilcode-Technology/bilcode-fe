import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { courses as allCoursesData } from '../data/courses';
import { Award, Printer } from 'lucide-react';

const CertificatePage = () => {
  const { courseId } = useParams();
  const { user } = useAuth();

  // In a real app, you'd fetch course data, but here we find it from our mock data.
  // We use the end of the href as a stand-in for a slug/id.
  const course = allCoursesData.find(c => c.href.endsWith(courseId));

  if (!user || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
        <h1 className="text-3xl font-bold text-slate-800">Sertifikat Tidak Valid</h1>
        <p className="text-slate-600 mt-2">Kami tidak dapat menemukan detail untuk sertifikat ini.</p>
        <Link to="/dashboard" className="mt-8 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Kembali ke Dasbor
        </Link>
      </div>
    );
  }

  const completionDate = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  const certificateId = `UC-${course.id}-${user.name.replace(/\s+/g, '').toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center p-4 print:bg-white print:p-0">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-8 print:shadow-none print:rounded-none">
        <div className="border-4 border-blue-800 p-8 relative text-center">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4">
            <Award className="w-16 h-16 text-yellow-500" />
          </div>
          <div className="absolute -top-2 -left-2 w-24 h-24 border-t-8 border-l-8 border-blue-200"></div>
          <div className="absolute -bottom-2 -right-2 w-24 h-24 border-b-8 border-r-8 border-blue-200"></div>

          <h1 className="text-5xl font-serif font-bold text-blue-900">Sertifikat Penyelesaian</h1>
          <p className="text-slate-600 text-lg mt-6">Dengan ini menyatakan bahwa</p>
          <p className="text-4xl font-extrabold text-slate-800 my-8 tracking-wider">{user.name}</p>
          <p className="text-slate-600 text-lg">telah berhasil menyelesaikan kursus online</p>
          <h2 className="text-3xl font-semibold text-blue-800 my-6">{course.title}</h2>
          <div className="flex justify-between items-center mt-16 text-left">
            <div>
              <p className="font-bold">Tanggal Penyelesaian</p>
              <p className="text-slate-600">{completionDate}</p>
            </div>
            <div className="text-center">
                <p className="font-bold text-2xl font-serif text-blue-900">Bilcode Academy</p>
                <p className="text-slate-500 text-sm">Platform Belajar Online</p>
            </div>
            <div>
              <p className="font-bold">ID Sertifikat</p>
              <p className="text-slate-600">{certificateId}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 right-8 print:hidden">
        <button 
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 flex items-center gap-2 transition-transform hover:scale-110"
        >
          <Printer className="w-5 h-5" />
          Cetak atau Simpan PDF
        </button>
      </div>
    </div>
  );
};

export default CertificatePage;